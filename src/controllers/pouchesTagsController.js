const readline = require("readline");
const { Readable } = require("stream");
const ejs = require("ejs");
const path = require("path");
const XLSX = require("xlsx");
const generatorPDFPuppeteer = require("../controllers/generatorPDFPuppeteerController");
const clients = require("../util/clientsList");
const moment = require("moment");
const crypto = require("crypto");
const selectTemplate = require("../util/selectTemplate");

const normalizeSchoolName = (name = "") => {
  return String(name)
    .replace("ESCOLA MUNICIPAL ", "")
    .replace("PROFESSORA ", "PROFª ")
    .replace("PROFESSOR ", "PROF ")
    .replace("FRANCISCO ", "FCO ")
    .replace("FRANCISCA ", "FCA ")
    .replace("CENTRO DE EDUCACAO INFANTIL ", "CEI ");
};

const normalizeCurrentYear = (value = "") => {
  const year = String(value).trim();

  if (!year) return "";

  return year.length > 1 ? year.toUpperCase() : `${year}º ANO`;
};

const mapLineToSchool = (columns) => {
  return {
    nameSchool: normalizeSchoolName(columns[0] || ""),
    studant: columns[1] || "",
    class: columns[4] || "",
    currentYear: normalizeCurrentYear(columns[5] || ""),
    period: columns[7] || "",
  };
};

const readCsvFile = async (buffer) => {
  const readableFile = new Readable();
  readableFile.push(buffer.toString("latin1"));
  readableFile.push(null);

  const schoolsLine = readline.createInterface({
    input: readableFile,
    crlfDelay: Infinity,
  });

  const schools = [];

  for await (const line of schoolsLine) {
    if (!line || !line.trim()) continue;

    const schoolsLineSplit = line.split(";");

    schools.push(mapLineToSchool(schoolsLineSplit));
  }

  return schools;
};

const readXlsxFile = async (buffer) => {
  const workbook = XLSX.read(buffer, { type: "buffer" });

  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error("A planilha não possui abas");
  }

  const worksheet = workbook.Sheets[firstSheetName];

  const rows = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
    defval: "",
  });

  const schools = rows
    .filter((row) => Array.isArray(row) && row.some((cell) => String(cell).trim() !== ""))
    .map((row) => mapLineToSchool(row));

  return schools;
};

const readUploadedFile = async (file) => {
  const originalName = (file.originalname || "").toLowerCase();
  const mimetype = (file.mimetype || "").toLowerCase();

  const isXlsx =
    originalName.endsWith(".xlsx") ||
    mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  const isCsv =
    originalName.endsWith(".csv") ||
    mimetype === "text/csv" ||
    mimetype === "application/csv" ||
    mimetype === "text/plain";

  if (isXlsx) {
    return readXlsxFile(file.buffer);
  }

  if (isCsv) {
    return readCsvFile(file.buffer);
  }

  throw new Error("Formato de arquivo inválido. Envie um arquivo .csv ou .xlsx");
};

const pouchesTags = async (request, response) => {
  try {
    const { discipline, evaluation, client, printTestNumber } = request.body;
    const { file } = request;

    if (!file) {
      return response
        .status(400)
        .json({ message: "O arquivo com a lista de alunos é obrigatório" });
    }

    if (!discipline) {
      return response
        .status(400)
        .json({ message: "O nome da disciplina é obrigatório" });
    }

    if (!printTestNumber) {
      return response
        .status(400)
        .json({
          message: "O printTestNumber é obrigatório, digite sim ou não como valor",
        });
    }

    if (!evaluation) {
      return response
        .status(400)
        .json({ message: "O nome da avaliação é obrigatório" });
    }

    if (!client) {
      return response
        .status(400)
        .json({ message: "O client é obrigatório", example: clients });
    }

    const templatName = selectTemplate(response, client);

    const printNumberOfTests =
      String(printTestNumber).toUpperCase() === "SIM" ? 1 : 0;

    const schools = await readUploadedFile(file);

    if (!schools.length) {
      return response.status(400).json({
        message: "O arquivo está vazio ou não contém dados válidos",
      });
    }

    const validSchools = schools.filter(
      (item) => item.nameSchool && item.class && item.currentYear
    );

    const items = [];

    for (let i = 0; i < validSchools.length; i += 1) {
      items.push({
        nameSchool: validSchools[i].nameSchool,
        currentYear: validSchools[i].currentYear,
        class: validSchools[i].class,
        period: validSchools[i].period,
      });
    }

    const uniqueItems = Array.from(new Set(items.map(JSON.stringify))).map(
      JSON.parse
    );

    const tagData = uniqueItems.map((school) => {
      const listStudentsTheUniqueByClass = validSchools.filter(
        (filter) =>
          school.nameSchool === filter.nameSchool &&
          school.currentYear === filter.currentYear &&
          school.class === filter.class
      );

      const listStudentsByClass = listStudentsTheUniqueByClass.map(
        (studantOfClass) => studantOfClass.studant
      );

      const countTests = String(listStudentsByClass.length).padStart(2, "0");

      return {
        ...school,
        discipline,
        evaluation,
        countTests,
        printNumberOfTests,
      };
    });

    tagData.sort((a, b) => (a.class > b.class ? 1 : a.class < b.class ? -1 : 0));
    tagData.sort((a, b) =>
      a.currentYear > b.currentYear ? 1 : a.currentYear < b.currentYear ? -1 : 0
    );
    tagData.sort((a, b) =>
      a.nameSchool > b.nameSchool ? 1 : a.nameSchool < b.nameSchool ? -1 : 0
    );

    const filePathTemplat = path.join(
      __dirname,
      "../",
      "views",
      "templats",
      templatName
    );

    ejs.renderFile(filePathTemplat, { tagData }, async (err, html) => {
      if (err) {
        return response
          .status(500)
          .json({ message: "Erro na leitura do template" });
      }

      const clientNameForFile = client.toLowerCase().replace(/\s/g, "_");

      const clientNameForFileNotAccents = clientNameForFile
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const currentDateForFileName = moment(Date.now()).format("YYYYMMDD");
      const fileHash = crypto.randomBytes(6).toString("hex").toUpperCase();

      const fileName = `etiquetas_${clientNameForFileNotAccents}_${currentDateForFileName}${fileHash}.pdf`;

      await generatorPDFPuppeteer(html, fileName);

      const fileUrl = `${process.env.APP_URL}${process.env.PORT}/tags/${fileName}`;

      return response
        .status(201)
        .json(`Clique no link para abrir o arquivo: ${fileUrl}`);
    });
  } catch (error) {
    return response.status(400).json({
      message: error.message || "Erro ao processar o arquivo enviado",
    });
  }
};

module.exports = pouchesTags;