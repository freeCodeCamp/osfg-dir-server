require('dotenv').config();
const verify = require('verify-github-webhook').default;

const signature = 'sha1=fafdfd8269044326dbea5020d9a650b6211fa7ce';
const payload = JSON.stringify();
const secret = process.env.WEBHOOK_KEY;

console.log(verify(signature, payload, secret));