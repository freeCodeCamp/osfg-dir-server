/**
* Note, the open-source-for-good-directory does not have a server back-end.
* This is the reference code for a remote server that receives GitHub webhooks.
* Here's how it's used: The server receives incoming push events for all
* freeCodeCamp repos. The server captures the webhook POST request, determines
* if there is an update to a README file, and if so, downloads the file from the
* repo, transforms the file to an HTML template, remotely pushes the file to
* open-source-for-good-directory repo which is then automatically deployed to
* GitHub Pages.
*/

const fs = require('fs');
const path = require('path');
require('dotenv').config();
const fetch = require('node-fetch');
const showdown = require('showdown');

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
    console.log(rawReadme);
    /* Header Inclusion necessary for the
        GitHub API https://developer.github.com/v3/#user-agent-required */
    const options = {
      headers: {
        'User-Agent': 'open-source-for-good-directory'
      }
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

    /*
      Processing the File
    */
    writeHtmlFile(page);
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
        <img className="contributor-img" src="${c.avatar_url}"/>
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
