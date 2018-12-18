// Walks through the directory and returns the list of all JS files
var fs = fs || require('fs');
var _ = require('underscore');
var path = path || require('path');
var excludedFiles = [];

var excludeConfig = { //Configuration to exclude specified files or folders
    '.vscode': true,
    'node_modules': true,
    'file-list.js': true,
    'auto-code-review.js': true
}

for(var key in excludeConfig) {
    if (excludeConfig[key]) {
        excludedFiles.push(key);
    }
}
function walkSync(dir, filelist) {
    dir = dir || process.cwd();
    var files = fs.readdirSync(dir);
    files = files.filter( function(file) {
        return excludedFiles.indexOf(file) < 0;
    } );
    filelist = filelist || [];
    files.forEach(function(file) {
        file = path.resolve(dir, file);
        if (fs.statSync(file).isDirectory()) {
            filelist = walkSync(file, filelist);
        } else {
            filelist.push(file);
        }
    });
    filelist = _.filter(filelist, function(file) {
        return (path.extname(file)) === '.js';
    });
    return filelist;
};
module.exports = walkSync;