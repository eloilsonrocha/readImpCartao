const puppeteer = require("puppeteer");
const path = require("path");

const pdfGenerator = async (html) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setContent(html)

  await page.pdf({ path: "./file.pdf", format: 'A4' })

  await browser.close()
}

module.exports = pdfGenerator;