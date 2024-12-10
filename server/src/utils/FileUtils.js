const fs = require('fs');

class FileUtils {
    static writeFile(filename, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(__dirname + filename, JSON.stringify(data), (err) => {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                resolve();
            })
        })
    }
}

module.exports = FileUtils;