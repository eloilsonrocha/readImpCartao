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

  const [,...studentsAll] = students

  const resultGroupStudents = [];


  for (let i = 1; i < studentsAll.length; i += 1) {
    const numberOfStudents = studentsAll.filter((a) => a.Nis === students[i].Nis);

    const resultStudents = {
      UsuarioNome: studentsAll[i].UsuarioNome,
      Nis: studentsAll[i].Nis,
      Escola: studentsAll[i].Escola,
      AnoCursado: studentsAll[i].AnoCursado,
      Turma: studentsAll[i].Turma,
    };

    i += numberOfStudents.length;

    for (let j = 1; j <= numberOfStudents.length; j += 1) {
      resultStudents[`ProvaId${j}`] = studentsAll[j - 1].ProvaId;
    }

    for (let j = 1; j <= numberOfStudents.length; j += 1) {
      resultStudents[`ProvaDescricao${j}`] = studentsAll[j - 1].ProvaDescricao;
    }

    for (let j = 1; j <= numberOfStudents.length; j += 1) {
      resultStudents[`Disciplina${j}`] = studentsAll[j - 1].Disciplina;
    }

    resultGroupStudents.push(resultStudents);
  }

  return response.json(resultGroupStudents)
})

module.exports = router;
