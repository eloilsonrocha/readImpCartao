const readline = require("readline");
const { Readable } = require("stream");
const ejs = require("ejs");
const path = require("path");
const generatorPDFPuppeteer = require('../controllers/generatorPDFPuppeteerController');
const QRCode = require('qrcode')

const pouchesTags = async (request, response) => {

  const { discipline, evaluation } = request.body

  const { file } = request
  const { buffer } = file

  const readableFile = new Readable();
  readableFile.push(buffer.toString("latin1"));
  readableFile.push(null)

  const schoolsLine = readline.createInterface({
    input: readableFile
  })

  const schools = []

  for await (let line of schoolsLine) {
    const schoolsLineSplit = line.split(";")



    schools.push({
      nameSchool: schoolsLineSplit[0].replace('ESCOLA MUNICIPAL ', ''),
      studant: schoolsLineSplit[1],
      class: schoolsLineSplit[4],
      currentYear: schoolsLineSplit[5] + 'º ANO',
    })
  }

  const items = [];

  for (let i = 1; i < schools.length - 1; i += 1) {

    const dataURL = `${schools[i].nameSchool} ${schools[i].currentYear} ${schools[i].class}`

    const qrcodeDataURL = await QRCode.toDataURL(dataURL);

    items.push({
      nameSchool: schools[i].nameSchool,
      currentYear: schools[i].currentYear,
      class: schools[i].class,
      qrcodeURL: qrcodeDataURL
    });

  };

  const uniqueItems = Array.from(new Set(items.map(JSON.stringify))).map(JSON.parse);

  const tagData = uniqueItems.map(school => {
    schools.filter((filter) =>
      school.nameSchool === filter.nameSchool &&
      school.currentYear === filter.currentYear &&
      school.class === filter.class &&
      school.qrcodeURL === filter.qrcodeURL)

    const ListStudentsTheUniqueByClass = schools.filter((filter) =>
      school.nameSchool === filter.nameSchool &&
      school.currentYear === filter.currentYear &&
      school.class === filter.class)

    const ListStudentsByClass = ListStudentsTheUniqueByClass.map(studantOfClass => studantOfClass.studant)

    const countTests = String(ListStudentsByClass.length).padStart(2, '0')

    return {
      ...school,
      discipline,
      evaluation,
      countTests
    }

  });

  tagData.sort((a, b) => a.class > b.class ? 1 : a.class < b.class ? -1 : 0)
  tagData.sort((a, b) => a.currentYear > b.currentYear ? 1 : a.currentYear < b.currentYear ? -1 : 0)
  tagData.sort((a, b) => a.nameSchool > b.nameSchool ? 1 : a.nameSchool < b.nameSchool ? -1 : 0)

  const filePath = path.join(__dirname, "../", "views", "templats", "pouchesTagsTemplat.ejs");

  ejs.renderFile(filePath, { tagData }, async (err, html) => {
    if (err) {
      return response.status(500).json({ message: "Erro na leitura do arquivo" })
    }

    await generatorPDFPuppeteer(html, "etiquetas")

    // return response.send(html)
    return response.status(201).json('PDF gerado com sucesso')
    // return response.json(tagData)

  })
};

module.exports = pouchesTags;