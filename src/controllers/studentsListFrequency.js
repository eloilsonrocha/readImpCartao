const readline = require("readline");
const { Readable } = require("stream");

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
      name: schoolsLineSplit[0],
      studant: schoolsLineSplit[1],
      class: schoolsLineSplit[4],
      currentYear: schoolsLineSplit[5],
    })
  }

  const items = [];
  for (let i = 1; i < schools.length - 1; i += 1) {
    items.push({
      name: schools[i].name,
      class: schools[i].class,
      currentYear: schools[i].currentYear
    });
  };

  const uniqueItems = Array.from(new Set(items.map(JSON.stringify))).map(JSON.parse);
  const result = [];

  const result = uniqueItems.map(school => {
    const studants = schools.filter((filter) =>
      school.name === filter.name &&
      school.currentYear === filter.currentYear &&
      school.class === filter.class).map(schoolFounds => schoolFounds.studant);

    return {
      ...school,
      classes: studants
    }
  });

  result.sort((a, b) => a.currentYear > b.currentYear ? 1 : a.currentYear < b.class ? -1 : 0)

  return response.json(result);

};

module.exports = studentsListFrequency;