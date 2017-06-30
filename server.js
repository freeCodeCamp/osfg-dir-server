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
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fetch = require('node-fetch');
const showdown = require('showdown');
const converter = new showdown.Converter();

const app = express();

app.use(bodyParser.json());

app.post('/event', (req, res) => {
  if (verifySignature(req.body, req.headers) && isReadmeUpdated(req.body)) {
    // if (true) {
    const readmeURL = getReadmeUrl(req.body);
    const contributorsURL = getContributorsURL(req.body);
    let rawReadme;

    fetch(readmeURL)
      .then(verifyText)
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
      .then(verifyJson)
      .then(contributorsData => {
        /*
          Building the HTML Web Page from the Fetched Data
        */
        const contributors = buildContributorHtml(contributorsData);
        const body = converter.makeHtml(rawReadme);
        const repoName = req.body.repository.name;
        const page = buildPage(repoName, body, contributors);

        /*
          Processing the File
        */
        writeHtmlFile(page);
        const encodedPage = base64EncodeString(page);

        /* 
          Pushing to GitHub Repo
        */
        pushFileToRepo(encodedPage, repoName);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.get('/', (req, res) => {
  res.send('Nothing to see here');
});

const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${server.address().port}`);
});

/*
  Verifications
*/
function verifySignature(body, headers) {
  const signature = headers['x-hub-signature'];
  const hash = `sha1=${crypto
    .createHmac('sha1', process.env.WEBHOOK_KEY)
    .update(body.toString())
    .digest('hex')}`;
  /*
    SIGNATURE VERIFICATION TO BE COMPLETED (Test HMAC hash)
  */
  return true;
}

function isReadmeUpdated(body) {
  // Checks Modifications to the README.md file in the Master Branch
  const readme = 'README.md';
  // UNCOMMENT for Deployment
  // const isMasterBranch = /master$/.test(body.ref);
  const isMasterBranch = true;
  if (isMasterBranch) {
    body.commits.forEach(commit => {
      if (commit.modified === readme || commit.added === readme) return true;
    });
  }
  return false;
}

/*
  Data Parsing
*/
function getReadmeUrl(body) {
  const root = 'https://raw.githubusercontent.com/';
  const repo = body.repository.full_name;
  const file = '/master/README.md';
  return root + repo + file;
}

function getContributorsURL(body) {
  const repo = body.repository.name;
  return `https://api.github.com/repos/freecodecamp/${repo}/contributors`;
}

function verifyText(res) {
  if (
    res.ok &&
    res.headers.get('content-type') === 'text/plain; charset=utf-8'
  ) {
    return res.text();
  }
  const err = new Error(
    `Invalid Response from Github Request. Status Code: ${res.statusCode}`
  );
  throw err;
}

function verifyJson(res) {
  if (
    res.ok &&
    res.headers.get('content-type') === 'application/json; charset=utf-8'
  ) {
    return res.json();
  }
  const err = new Error(
    `Invalid Response from Github Request. Status Code: ${res.statusCode}`
  );
  throw err;
}

/*
  Building WebPage
*/
function buildContributorHtml(contributors) {
  let html = '';
  contributors.forEach(c => {
    html += `
    <div class="contributor">
      <a class="contributor-link" href="${c.url}">
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
        <link rel="stylesheet" href="../style.css">
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
  const newPath = path.join(__dirname, '/views/index.html');
  try {
    fs.writeFile(newPath, html, 'utf-8', err => {
      if (err) throw err;
    });
  } catch (err) {
    console.log({ message: 'Error writing file', error: err });
  }
}

function base64EncodeString(string) {
  return new Buffer(string).toString('base64');
}

/*
  Pushing to GitHub Repo
*/
function pushFileToRepo(webPage, repo) {
  const fileURL = `https://api.github.com/repos/freecodecamp/open-source-for-good-directory/contents/docs/${repo}/index.html`;
  const options = {
    headers: {
      'User-Agent': 'osfg-request',
    },
  };

  /*
    Request File to be Updated (Getting the SHA)
  */
  fetch(fileURL, options)
    .then(res => {
      console.log('GET File:', res);
      const sha = res.json().sha || '';
      // UPDATE or CREATE File
      const options = {
        headers: {
          'User-Agent': 'osfg-request',
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        method: 'PUT',
        json: {
          path: `docs/${repo}/index.html`,
          sha,
          message: `Camper Bot updating README.md for ${repo}`,
          committer: {
            name: 'Camper Bot',
            email: 'placeholder@test.com',
          },
          content: webPage,
          // REPLACE TO 'master' FOR DEPLOYMENT
          branch: 'dev-build-automation', 
        },
      };
      return fetch(fileURL, options);
    })
    .then(res => {
      console.log('C OR U:', res);
      let log = {};
      if (res.status === 200) {
        log.message = `${repo} index.html updated`;
      } else if (res.status === 201) {
        log.message = `${repo} index.html created`;
      } else {
        log = {
          message: 'Invalid response from GitHub file creation',
          status: res.statusCode,
        };
      }
      console.log(log);
    })
    .catch(err => console.log(err));
}
