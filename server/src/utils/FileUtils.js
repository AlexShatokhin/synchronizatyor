const fs = require('fs');
const path = require('path');

class FileUtils {
    static writeFile(filename, data) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, "../", "files/", filename);
            fs.writeFile(filePath, JSON.stringify(data), (err) => {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                resolve();
            })
        })
    }
    static getPath(filename){
        return path.join(__dirname, "../", "files/", filename);
    }
}

module.exports = FileUtils;