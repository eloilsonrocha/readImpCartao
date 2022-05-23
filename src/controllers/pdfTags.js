const puppeteer = require("puppeteer");



const pdfTags = async (request, response) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await browser.close()

  return response.send('feito')
}

module.exports = pdfTags;