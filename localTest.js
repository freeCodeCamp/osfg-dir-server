const fs = require('fs');
const path = require('path');
require('dotenv').config();
const fetch = require('node-fetch');
const showdown = require('showdown');
const htmlAutoFormat = require('js-beautify').html;
const embed = require('embed-video');

const converter = new showdown.Converter();

const readmeURL =
  'https://raw.githubusercontent.com/freecodecamp/mail-for-good/master/README.md';
const contributorsURL =
  'https://api.github.com/repos/freeCodeCamp/mail-for-good/contributors';

const repoConfig = require('./.osfg-dir-config');

fetch(readmeURL)
  .then(res => res.text())
  // Fetch Contributors
  .then(text => {
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
    const repoLink = 'https://www.github.com/freecodecamp/mail-for-good';
    const contributors = buildContributorsHtml(contributorsData);
    const page = buildPage(repoConfig, repoLink, contributors);
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
function buildContributorsHtml(contribData) {
  let html = '';
  contribData.forEach(contributor => {
    html += `
    <div class="contributor">
      <a class="contributor-link" href="${contributor.html_url}" target="_blank">
        <img class="contributor-img" src="${contributor.avatar_url}"/>
      </a>
    </div>`;
  });
  return html;
}

function buildPage(repoConfig, repoLink, contributors) {
  const { title, description, demoVideo, liveDemo, body } = repoConfig;
  return `
    <!DOCTYPE html>
    <html>
      <header>
        <link rel="stylesheet" href="./style.css">
        <!-- Font Awesome -->
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
      </header>
      <body>
        <div class="wrapper">
          <a href="https://www.freecodecamp.org">
            <div class="fcc-banner">
              <img src="https://cdn.glitch.com/f9a9063e-4605-4536-942e-6a948a65598e%2Ffcc-logo-white.png?1491457226808"/>
            </div>
          </a>
          <div class="content-container">
            <h1 class="repo-name">${title}</h1>
            <div class="project-description">
              ${description ? converter.makeHtml(description) : ''}
            </div>
            ${demoVideo
              ? `<div class="project-video">
                  <div class="video-container">
                    ${embed(demoVideo, { attr: { width: 640, height: 360 } })}
                  </div>
                </div>`
              : ''}
            <div class="buttons-container">
              ${liveDemo
                ? `<a href="${liveDemo}" target="_blank">
                <button>
                  Live Demo 
                  <i class="fa fa-cube" aria-hidden="true"></i>
                </button></a>`
                : ''}
              <a href="${repoLink}" target="_blank">
                <button>
                  Code Repo
                  <i class="fa fa-code" aria-hidden="true"></i>
                </button></a>
            </div>
            <div class="body-container">
              ${body ? converter.makeHtml(body) : ''}
            </div>
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
