const readline = require("readline");
const { Readable } = require("stream");
const { XLSX } = require("xlsx");

const studentsListFrequency = async (request, response) => {

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
      Escola: schoolsLineSplit[0],
      UsuarioNome: schoolsLineSplit[1],
      Turma: schoolsLineSplit[4],
      AnoCursado: schoolsLineSplit[5],
    })
  }

  const resultStudentsFull = []
  // const groupedResultSchools = new Map();

  for (let i = 1; i < schools.length; i += 1) {
    const howManySchools = schools.filter((school) => school.Escola === schools[i].Escola);

    
    const resultSchools = [{
     name: schools[i].Escola,
     classes: []      
    }];

    for (let j = 1; j <= howManySchools.length; j += 1) {

      console.log(howManySchools[j]);

        const students = howManySchools.filter(school => school.AnoCursado === howManySchools[j].AnoCursado && school.Turma === howManySchools[j].Turma)

        resultSchools[0].classes.push({ AnoCursado: howManySchools[j].AnoCursado, Turma: howManySchools[j].Turma, students })
    }
    
    resultSchools.sort((a, b) => a.AnoCursado > b.AnoCursado ? 1 : a.AnoCursado < b.nomeTurma ? -1 : 0)

    resultStudentsFull.push(resultSchools);
  };

  // resultStudentsFull.forEach((schools) => {
  //   if (!groupedResultSchools.has(schools.escola)) {
  //     groupedResultSchools.set(schools.escola, schools)
  //   }
  // });

  // return response.json([...groupedResultSchools.values()]);
  return response.json(resultStudentsFull);

};

module.exports = studentsListFrequency;