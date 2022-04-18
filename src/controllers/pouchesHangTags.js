const readline = require("readline");
const { Readable } = require("stream");

const pouchesHangTags = async (request, response) => {

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

  const resultSchoolsFull = []
  const groupedResultSchools = new Map();

  for (let i = 1; i < schools.length; i += 1) {
    const howManySchools = schools.filter((school) => school.Escola === schools[i].Escola);

    const resultSchools = {
      escola: schools[i].Escola,
      turmas: []
    };

    for (let j = 1; j <= howManySchools.length; j += 1) {
      if (howManySchools[j - 1].AnoCursado !== "10") { 
        const numeroProvas = []

        numeroProvas.push(howManySchools[j - 1].AnoCursado + "_" + howManySchools[j - 1].Turma);

        console.log(numeroProvas);
      }

 
      if (howManySchools[j - 1].AnoCursado !== "10") { 
        if(!resultSchools.turmas.includes(howManySchools[j - 1].AnoCursado + "_" + howManySchools[j - 1].Turma)) {
          resultSchools.turmas.push(howManySchools[j - 1].AnoCursado + "_" + howManySchools[j - 1].Turma);
        }
      } 
    }
    
    resultSchools.turmas.sort((a, b) => a.nomeTurma > b.nomeTurma ? 1 : a.nomeTurma < b.nomeTurma ? -1 : 0)

    resultSchoolsFull.push(resultSchools);
  };

  resultSchoolsFull.forEach((schools) => {
    if (!groupedResultSchools.has(schools.escola)) {
      groupedResultSchools.set(schools.escola, schools)
    }
  });

  return response.json([...groupedResultSchools.values()]);

};

module.exports = pouchesHangTags;