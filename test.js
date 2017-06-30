require('dotenv').config();
const fetch = require('node-fetch');

const url =
  'https://api.github.com/repos/freecodecamp/open-source-for-good-directory/contents/src/constants/index.js';

const options = {
  method: 'PUT',
  headers: {
    'User-Agent': 'osfg-request',
    'content-type': 'application/json',
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
  body: JSON.stringify({
    path: 'src/constants/index.js',
    sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
    message: 'Github API Test',
    content: 'SGVsbG8gV29ybGQ=',
    branch: 'dev-build-automation',
  }),
};

fetch(url, options).then(res => {
  console.log(res);
});
