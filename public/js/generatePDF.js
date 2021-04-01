const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8089/cliente/viewpdf/5ff687042843502bec055682', {
    waitUntil: 'networkidle2',
  });

  await page.pdf({ 
    path: 'procuracao.pdf',
    format: 'A4',
    margin: {
            top: "20px",
            bottom: "40px",
            left: "60px",
            right: "60px" }
    })

  await browser.close();
})();