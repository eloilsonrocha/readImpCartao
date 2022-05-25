const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const pdfGenerator = async (html, fileName) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setContent(html)

  const fileNameInFolder = path.join(__dirname, "..", "..", "tmp", `${fileName}.pdf`)

  const filePathExist = await fs.promises.stat(fileNameInFolder);

  if (filePathExist) {
    await fs.promises.unlink(fileNameInFolder)
  }
  
  const filePathName = path.join(__dirname, "..", "..", "tmp", `${fileName}.pdf`)
 
  await page.pdf({ path: filePathName, format: 'A4' })

  await browser.close()
}

module.exports = pdfGenerator;