const readline = require("readline");
const { Readable } = require("stream");

const studentsListCard = async (request, response) => {

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

};

module.exports = studentsListCard;