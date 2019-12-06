// 合并代码的脚本
// var fs = require('fs')
// export function contact(filepath1,filepath2) {
//   // var content = fs.readFileSync('./src/a.js').toString() + '\n' + fs.readFileSync('./src/b.js')
//   var content = fs.readFileSync(filepath1).toString() + '\n' + fs.readFileSync(filepath2)
//   fs.writeFileSync('./dist/ab.js',content)
// }
// contact('./src/a.js','./src/b.js');

var contactFun = require('cd-file-contact')

contactFun.contactFile('./src/a.js','./src/b.js')
