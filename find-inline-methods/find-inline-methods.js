const path = require('path');
const Parse = require("@babel/parser").parse;
const walk = require('babylon-walk');
const generate = require('@babel/generator').default;

function findInlineMethods(filePath, source) {
    var reportStr = '';
    var ast = Parse(source, {
      // parse in strict mode and allow module declarations
      sourceType: "module",

      plugins: [
        // enable jsx and flow syntax
        "jsx",
        "flow",
        "classProperties"
      ]
    });
    walk.ancestor(ast, {
        JSXAttribute(_, ancestors) {
            const { name, value} = _;
            if (value && value.expression && value.expression.type === 'ArrowFunctionExpression') {
                reportStr += 'line: ' + _.loc.start.line + ' - ' + filePath + '\n';
            }
        }
    });
    return reportStr;
};

module.exports = findInlineMethods;