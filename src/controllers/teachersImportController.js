const readline = require("readline");
const { Readable } = require("stream");

const teachersImport = async (request, response) => {


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
}

module.exports = teachersImport;