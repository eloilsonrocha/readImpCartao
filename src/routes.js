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

  for await (let line of studentLine) {
    const studentLineSplit = line.split(";")

  console.log(results);
  }

  return response.send()
})

module.exports = router;
