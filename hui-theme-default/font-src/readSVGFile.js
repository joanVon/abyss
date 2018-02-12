var fs = require('fs');
var join = require('path').join;
var iconv = require('iconv-lite');
var path = require('path');

var table = {};
/**
 * 读取svg文件：按文件夹读取svg文件名，最终生成分了数组，保存到hui-icon.json，用于生成demo
 * @param startPath
 */
function findSync(startPath) {
    let fontClass = '';
    function finder(path) {
        let files = fs.readdirSync(path);
        // 遍历文件
        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            // 判断是否为文件夹，是文件夹继续做遍历
            if (stats.isDirectory()) {
                fontClass = val;
                table[fontClass] = [];
                finder(fPath);
            }
            // 判断为文件时，获取文件名称
            if (stats.isFile()) {
                var newNames = val.split('.svg');
                var enName = newNames[0];
                table[fontClass].push(enName);
            }
    });

    }
    finder(startPath);
}
findSync(path.resolve(__dirname, 'font'));

var t = JSON.stringify(table);
fs.writeFileSync(path.resolve(__dirname, '../../../examples/static/icon/hui-icon.json'), t);
console.log('readSVGFile Finished');
