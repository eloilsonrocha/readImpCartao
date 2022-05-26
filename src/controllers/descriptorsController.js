const readline = require("readline");
const { Readable } = require("stream");
const XLSX = require('xlsx');

const descriptors = async (request, response) => {


  const { file } = request;
  const { buffer } = file;

  const readableFile = new Readable();
  readableFile.push(buffer.toString("utf8"));
  readableFile.push(null);

  const descriptorLine = readline.createInterface({
    input: readableFile
  })

  const descriptors = [];

  for await (let line of descriptorLine) {
    const descriptorLineSplit = line.split(";");

    descriptors.push({
      IdDescritor: descriptorLineSplit[0],
      CodigoDescritor: descriptorLineSplit[1],
      DescricaoDescritor: descriptorLineSplit[2].trim(),
      AnoCursado: descriptorLineSplit[3],
      DataInclusao: descriptorLineSplit[4],
      Ativo: descriptorLineSplit[5],
      EmUso: descriptorLineSplit[6]
    });
  }


  const descriptorsFull = [];
  const groupedResultDescriptors = new Map();

  for (let i = 1; i < descriptors.length; i += 1) {
    const howManyDescriptor = descriptors.filter((
      descriptor) => descriptor.DescricaoDescritor === descriptors[i].DescricaoDescritor &&
      descriptor.AnoCursado === descriptors[i].AnoCursado
    );

    const resultDescriptors = {
      DescricaoDescritor: descriptors[i].DescricaoDescritor,
      AnoCursado: descriptors[i].AnoCursado
    };

    for (let j = 1; j <= howManyDescriptor.length; j += 1) {
      resultDescriptors[`IdDescritor${j}`] = howManyDescriptor[j - 1].IdDescritor;
      resultDescriptors[`CodigoDescritor${j}`] = howManyDescriptor[j - 1].CodigoDescritor;
      resultDescriptors[`DescricaoDescritor${j}`] = howManyDescriptor[j - 1].DescricaoDescritor;
      resultDescriptors[`AnoCursado${j}`] = howManyDescriptor[j - 1].AnoCursado;
      resultDescriptors[`DataInclusao${j}`] = howManyDescriptor[j - 1].DataInclusao;
      resultDescriptors[`Ativo${j}`] = howManyDescriptor[j - 1].Ativo;
      resultDescriptors[`EmUso${j}`] = howManyDescriptor[j - 1].EmUso;

      descriptorsFull.push(resultDescriptors);
    }
  };

  descriptorsFull.forEach((descriptor) => {
    if (!groupedResultDescriptors.has(descriptor.DescricaoDescritor)) {
      groupedResultDescriptors.set(descriptor.DescricaoDescritor, descriptor)
    }
  });

  const jsonToExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet([...groupedResultDescriptors.values()]);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "Descriptors")

    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })

    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

    XLSX.writeFile(workBook, "DESCRITORES DUPLICADOS.xlsx")
  }

  jsonToExcel()

  return response.json([...groupedResultDescriptors.values()])
}

module.exports = descriptors;