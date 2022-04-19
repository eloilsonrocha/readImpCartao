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
      birthDate:schoolsLineSplit[2],      
      userCPFNIS: schoolsLineSplit[3],
      class: schoolsLineSplit[4],
      currentYear: schoolsLineSplit[5],
    })
  }

  const items = [];
  for (let i = 1; i < schools.length - 1; i += 1) {
    items.push({
      name: schools[i].name,
      currentYear: schools[i].currentYear,
      class: schools[i].class
    });
  };

  const uniqueItems = Array.from(new Set(items.map(JSON.stringify))).map(JSON.parse);

  const result = uniqueItems.map(school => {
    const studants = schools.filter((filter) =>
      school.name === filter.name &&
      school.currentYear === filter.currentYear &&
      school.class === filter.class)

    const dataStudants = studants.map((studantOfClass, index) =>
      [{ 
        order: index +1,
        nameStudent: studantOfClass.studant,
        birthDate: studantOfClass.birthDate,
        userCPFNIS: studantOfClass.userCPFNIS 
      }]
    )
    
    const countStudents = dataStudants.length

    return {
      ...school,
      classes: dataStudants,
      countStudents       
    }

    
  });


  result.sort((a, b) => a.class > b.class ? 1 : a.class < b.class ? -1 : 0) 
  result.sort((a, b) => a.currentYear > b.currentYear ? 1 : a.currentYear < b.currentYear ? -1 : 0) 
  result.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)

  return response.json(result);

};

module.exports = studentsListFrequency;