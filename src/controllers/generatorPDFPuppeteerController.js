const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const generatorPDFPuppeteer = async (html, fileName) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setContent(html)

  const destinationFolder = path.join(__dirname, "..", "..", "tmp", `${fileName}`)

  await page.pdf({ path: destinationFolder, format: 'A4' })

  await browser.close()

}

module.exports = generatorPDFPuppeteer;