/*
START SERVER WITH
browser-sync start --server --files index.html style.css
*/

const fs = require('fs');
const path = require('path');
require('dotenv').config();
const fetch = require('node-fetch');
const showdown = require('showdown');
const htmlAutoFormat = require('js-beautify').html;

const converter = new showdown.Converter();

const readmeURL =
  'https://raw.githubusercontent.com/freecodecamp/mail-for-good/master/README.md';
const contributorsURL =
  'https://api.github.com/repos/freeCodeCamp/mail-for-good/contributors';
let rawReadme;

fetch(readmeURL)
  .then(res => res.text())
  // Fetch Contributors
  .then(text => {
    rawReadme = text;
    /* Header Inclusion necessary for the
        GitHub API https://developer.github.com/v3/#user-agent-required */
    const options = {
      headers: {
        'User-Agent': 'open-source-for-good-directory',
      },
    };
    return fetch(contributorsURL, options);
  })
  .then(res => res.json())
  .then(contributorsData => {
    /*
      Building the HTML Web Page from the Fetched Data
    */
    const contributors = buildContributorHtml(contributorsData);
    const body = converter.makeHtml(rawReadme);
    const repoName = 'freecodecamp/mail-for-good';
    const page = buildPage(repoName, body, contributors);

    const formattedPage = htmlAutoFormat(page, { indent_size: 2 });

    /*
      Processing the File
    */
    writeHtmlFile(formattedPage);
  })
  .catch(err => {
    console.log(err);
  });

/*
  Building WebPage
*/
function buildContributorHtml(contributors) {
  let html = '';
  contributors.forEach(c => {
    html += `
    <div class="contributor">
      <a class="contributor-link" href="${c.html_url}">
        <img class="contributor-img" src="${c.avatar_url}"/>
      </a>
    </div>`;
  });
  return html;
}

function buildPage(name, body, contributors) {
  return `
    <!DOCTYPE html>
    <html>
      <header>
        <link rel="stylesheet" href="./style.css">
      </header>
      <body>
        <div class="wrapper">
          <div class="fcc-banner">
            <img src="https://cdn.glitch.com/f9a9063e-4605-4536-942e-6a948a65598e%2Ffcc-logo-white.png?1491457226808"/>
          </div>
          <div class="content-container">
            <h1 class="repo-name">${name}</h1>
            ${body}
            <h2>Contributors</h2>
            <div class="contributors">
              ${contributors}
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
}

/*
  File Processing
*/
function writeHtmlFile(html) {
  const newPath = path.join(__dirname, '/index.html');
  fs.writeFile(newPath, html, 'utf-8', err => {
    if (err) {
      throw err;
    }
  });
}
