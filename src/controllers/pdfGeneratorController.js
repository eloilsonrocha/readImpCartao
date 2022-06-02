const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const pdfGenerator = async (html, fileName) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setContent(html)

  const destinationFolder = path.join(__dirname, "..", "..", "tmp", `${fileName}.pdf`)

  if (fs.existsSync(destinationFolder)) {
    await fs.promises.unlink(destinationFolder)
  }

  await page.pdf({ path: destinationFolder, format: 'A4' })

  await browser.close()

}

module.exports = pdfGenerator;