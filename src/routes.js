const { Router } = require("express");
const multer = require("multer");
const readline = require("readline");
const { Readable } = require("stream");
const XLSX = require('xlsx');

const multerConfig = multer();

const router = Router();

router.get("/test", (request, response) => {
  response.json({ message: "Ok api running" });
})


router.post("/students-list-card", multerConfig.single("file"), async (request, response) => {


  const { file } = request
  const { buffer } = file

  const readableFile = new Readable();
  readableFile.push(buffer.toString("latin1"));
  readableFile.push(null)

  const studentLine = readline.createInterface({
    input: readableFile
  })

  const students = []

  for await (let line of studentLine) {
    const studentLineSplit = line.split(";")

    students.push({
      UsuarioNome: studentLineSplit[2],
      ProvaDescricao: studentLineSplit[3],
      ProvaId: Number(studentLineSplit[4]),
      Nis: Number(studentLineSplit[5]),
      Disciplina: studentLineSplit[6],
      Escola: studentLineSplit[7],
      AnoCursado: Number(studentLineSplit[8]),
      Turma: studentLineSplit[9],
    })
  }

  const resultStudentsFull = []
  const groupedResultStudents = new Map();

  for (let i = 1; i < students.length; i += 1) {
    const howManyStudents = students.filter((student) => student.Nis === students[i].Nis);

    const resultStudents = {
      UsuarioNome: students[i].UsuarioNome,
      Nis: students[i].Nis,
      Escola: students[i].Escola,
      AnoCursado: students[i].AnoCursado,
      Turma: students[i].Turma,
    };

    for (let j = 1; j <= howManyStudents.length; j += 1) {
      resultStudents[`ProvaId${j}`] = howManyStudents[j - 1].ProvaId;
    }

    for (let j = 1; j <= howManyStudents.length; j += 1) {
      resultStudents[`ProvaDescricao${j}`] = howManyStudents[j - 1].ProvaDescricao;
    }

    for (let j = 1; j <= howManyStudents.length; j += 1) {
      resultStudents[`Disciplina${j}`] = howManyStudents[j - 1].Disciplina;
    }

    resultStudentsFull.push(resultStudents);
  };

  resultStudentsFull.forEach((students) => {
    if (!groupedResultStudents.has(students.Nis)) {
      groupedResultStudents.set(students.Nis, students)
    }
  });

  return response.json([...groupedResultStudents.values()]);

})

router.post("/teachers-import", multerConfig.single("file"), async (request, response) => {


  const { file } = request;
  const { buffer } = file;

  const readableFile = new Readable();
  readableFile.push(buffer.toString("utf-8"));
  readableFile.push(null);

  const teacherLine = readline.createInterface({
    input: readableFile
  })

  const teachers = [];

  for await (let line of teacherLine) {
    const teacherLineSplit = line.split("," || ";");

    teachers.push({
      username: teacherLineSplit[0],
      password: teacherLineSplit[1],
      firstname: teacherLineSplit[2],
      lastname: teacherLineSplit[3],
      email: teacherLineSplit[4],
      city: teacherLineSplit[5],
      course: teacherLineSplit[6],
      role: teacherLineSplit[7]
    });

  }

  const [, ...teacherAll] = teachers;

  const resultGroupTeachers = [];

  for (let i = 1; i < teacherAll.length; i += 1) {
    const howManyTeacher = teacherAll.filter((teacher) => teacher.username === teachers[i].username);

    const resultTeachers = {
      username: teacherAll[i].username,
      password: teacherAll[i].password,
      firstname: teacherAll[i].firstname,
      lastname: teacherAll[i].lastname,
      city: teacherAll[i].city
    };

    i += howManyTeacher.length;

    for (let j = 1; j <= howManyTeacher.length; j += 1) {
      resultTeachers[`course${j}`] = howManyTeacher[j - 1].course;
      resultTeachers[`role${j}`] = howManyTeacher[j - 1].role;
    }

    resultGroupTeachers.push(resultTeachers);
  };

  return response.json(resultGroupTeachers)
})

router.post("/descriptors", multerConfig.single("file"), async (request, response) => {


  const { file } = request;
  const { buffer } = file;

  const readableFile = new Readable();
  readableFile.push(buffer.toString("utf8"));
  readableFile.push(null);

  const descriptorLine = readline.createInterface({
    input: readableFile
  })

  const descriptors = [];

  for await (let line of descriptorLine) {
    const descriptorLineSplit = line.split(";");

    descriptors.push({
      IdDescritor: descriptorLineSplit[0],
      CodigoDescritor: descriptorLineSplit[1],
      DescricaoDescritor: descriptorLineSplit[2].trim().toLowerCase(),
      AnoCursado: descriptorLineSplit[3],
      DataInclusao: descriptorLineSplit[4],
      Ativo: descriptorLineSplit[5],
      EmUso: descriptorLineSplit[6]
    });
  }

  const descriptorsFull = [];
  const groupedResultDescriptors = new Map();

  for (let i = 1; i < descriptors.length; i += 1) {
    const howManyDescriptor = descriptors.filter((
      descriptor) => descriptor.DescricaoDescritor == descriptors[i].DescricaoDescritor &&
      descriptor.AnoCursado == descriptors[i].AnoCursado
    );

    const resultDescriptors = {
      DescricaoDescritor: descriptors[i].DescricaoDescritor,
      AnoCursado: descriptors[i].AnoCursado
    };

    for (let j = 1; j <= howManyDescriptor.length; j += 1) {
      resultDescriptors[`IdDescritor${j}`] = howManyDescriptor[j - 1].IdDescritor;
      resultDescriptors[`CodigoDescritor${j}`] = howManyDescriptor[j - 1].CodigoDescritor;
      resultDescriptors[`DescricaoDescritor${j}`] = howManyDescriptor[j - 1].DescricaoDescritor;
      resultDescriptors[`AnoCursado${j}`] = howManyDescriptor[j - 1].AnoCursado;
      resultDescriptors[`DataInclusao${j}`] = howManyDescriptor[j - 1].DataInclusao;
      resultDescriptors[`Ativo${j}`] = howManyDescriptor[j - 1].Ativo;
      resultDescriptors[`EmUso${j}`] = howManyDescriptor[j - 1].EmUso;

      descriptorsFull.push(resultDescriptors);
    }
  };

  descriptorsFull.forEach((descriptor) => {
    if (!groupedResultDescriptors.has(descriptor.DescricaoDescritor)) {
      groupedResultDescriptors.set(descriptor.DescricaoDescritor, descriptor)
    }
  });

  const jsonToExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet([...groupedResultDescriptors.values()]);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "Descriptors")

    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })

    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

    XLSX.writeFile(workBook, "DESCRITORES DUPLICADOS.xlsx")
  }

  jsonToExcel()

  return response.json([...groupedResultDescriptors.values()])
})


module.exports = router;
