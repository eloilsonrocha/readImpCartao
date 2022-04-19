const readline = require("readline");
const { Readable } = require("stream");

const pouchesTags = async (request, response) => {

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
      nameSchool: schoolsLineSplit[0],
      studant: schoolsLineSplit[1],
      class: schoolsLineSplit[4],
      currentYear: schoolsLineSplit[5],
    })
  }

  const items = [];
  for (let i = 1; i < schools.length - 1; i += 1) {
    items.push({
      nameSchool: schools[i].nameSchool,
      currentYear: schools[i].currentYear,
      class: schools[i].class
    });
  };

  const uniqueItems = Array.from(new Set(items.map(JSON.stringify))).map(JSON.parse);

  const result = uniqueItems.map(school => {
    const studants = schools.filter((filter) =>
      school.nameSchool === filter.nameSchool &&
      school.currentYear === filter.currentYear &&
      school.class === filter.class)

    const dataStudants = studants.map(studantOfClass => studantOfClass.studant)


    const countTests = dataStudants.length

    return {
      ...school,
      countTests
    }


  });


  result.sort((a, b) => a.class > b.class ? 1 : a.class < b.class ? -1 : 0)
  result.sort((a, b) => a.currentYear > b.currentYear ? 1 : a.currentYear < b.currentYear ? -1 : 0)
  result.sort((a, b) => a.nameSchool > b.nameSchool ? 1 : a.nameSchool < b.nameSchool ? -1 : 0)

  return response.json(result);

};

module.exports = pouchesTags;