import { Request, Response, Router } from "express";
import multer from "multer";
import readline from "readline";
import { Readable } from "stream";



const multerConfig = multer();

const router = Router();

interface Student {
  UsuarioNome: String;
  ProvaDescricao: String;
  ProvaIdA: Number;
  ProvaIdB: Number;
  Nis: Number;
  DisciplinaA: String;
  DisciplinaB: String;
  Escola: String;
  AnoCursado: Number;
  Turma: String;
}


router.post("/students", multerConfig.single("file"), async (request: Request, response: Response) => {


  const { file } = request
  const buffer = file?.buffer

  const readableFile = new Readable();
  readableFile.push(buffer?.toString("latin1"));
  readableFile.push(null)

  const studentLine = readline.createInterface({
    input: readableFile
  })

  for await (let line of studentLine) {
    const studentLineSplit = line.split(";")
    console.log(studentLineSplit[5]);
  }

  return response.send()
})

export { router };
