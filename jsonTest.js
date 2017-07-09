// let obj = require('./.osfg-dir-config.json');

// obj.description = obj.description.replace('\\\\', '\\');

// console.log(obj);

const fs = require('fs');
fs.readFile('./nonProfitTest.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(eval(data));
});
