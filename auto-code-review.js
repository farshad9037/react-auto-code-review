const fs = require('fs')
const fileList = require('file-list')();
const findInlineMethods = require('./find-inline-methods');
const writeToFile = require('./write-to-file');

let reportStr = '';

fileList.forEach(function(filePath, index) {
    var src = fs.readFileSync(filePath, 'utf8');
    reportStr += findInlineMethods(filePath, src);
});

writeToFile(reportStr || 'No anti patterns found!!!', 'report.txt');
