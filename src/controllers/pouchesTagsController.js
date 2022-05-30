const readline = require("readline");
const { Readable } = require("stream");
const ejs = require("ejs");
const path = require("path");
const pdfGenerator = require('../controllers/pdfGeneratorController');

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
      currentYear: schoolsLineSplit[5] + 'ª',
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

  const tagData = uniqueItems.map(school => {
    const studants = schools.filter((filter) =>
      school.nameSchool === filter.nameSchool &&
      school.currentYear === filter.currentYear &&
      school.class === filter.class)

    const dataStudants = studants.map(studantOfClass => studantOfClass.studant)

    const countTests = String(dataStudants.length).padStart(2, '0')

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

  const filePath = path.join(__dirname, "../", "templats", "pouchesTagsTemplat.ejs")

  ejs.renderFile(filePath, { tagData }, async (err, html) => {
    if (err) {
      return response.status(500).json({ message: "Erro na leitura do arquivo" })
    }

    await pdfGenerator(html, "etiquetas")

    // return response.send(html)
    return response.json('PDF gerado com sucesso')

  })
};

module.exports = pouchesTags;