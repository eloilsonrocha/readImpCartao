const { Router } = require("express");
const multer = require("multer");
const readline = require("readline");
const { Readable } = require("stream");

const multerConfig = multer();

const router = Router();


router.post("/students", multerConfig.single("file"), async (request, response) => {


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

  const [, ...studentsAll] = students;

  const resultGroupStudents = [];


  for (let i = 1; i < studentsAll.length; i += 1) {
    const howManyStudents = studentsAll.filter((a) => a.Nis === students[i].Nis);

    const resultStudents = {
      UsuarioNome: studentsAll[i].UsuarioNome,
      Nis: studentsAll[i].Nis,
      Escola: studentsAll[i].Escola,
      AnoCursado: studentsAll[i].AnoCursado,
      Turma: studentsAll[i].Turma,
    };

    i += howManyStudents.length;

    for (let j = 1; j <= howManyStudents.length; j += 1) {
      resultStudents[`ProvaId${j}`] = studentsAll[j - 1].ProvaId;
    }

    for (let j = 1; j <= howManyStudents.length; j += 1) {
      resultStudents[`ProvaDescricao${j}`] = studentsAll[j - 1].ProvaDescricao;
    }

    for (let j = 1; j <= howManyStudents.length; j += 1) {
      resultStudents[`Disciplina${j}`] = studentsAll[j - 1].Disciplina;
    }

    resultGroupStudents.push(resultStudents);
  }

  return response.json(resultGroupStudents)
})

router.post("/teachers", multerConfig.single("file"), async (request, response) => {


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
    const teacherLineSplit = line.split(";");

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
      resultTeachers[`course${j}`] = teacherAll[j - 1].course;
    }

    for (let j = 1; j <= howManyTeacher.length; j += 1) {
      resultTeachers[`role${j}`] = teacherAll[j - 1].role;
    }

    resultGroupTeachers.push(resultTeachers);
  }

  return response.json(resultGroupTeachers)
})


module.exports = router;
