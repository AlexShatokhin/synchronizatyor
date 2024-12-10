const FileUtils = require('../utils/FileUtils');
const parseString = require("xml2js").parseString;

class SerializationController {
    async handleJSON(req, res){
        const data = req.body.data;
        const filename = `jsonResult_.txt`;

        await FileUtils.writeFile(filename, data);
    }

    async handleXml(req, res) {
        parseString(req.body.data, async (err, result) => {
            if (err) {
                return res.status(500).send("Error parsing XML");
            }
            const filename = `xmlResult.txt`;

            try {
                await FileUtils.writeFile(filename, result)
                res.send({ message: "File has been saved!" });
            } catch (error) {
                res.status(500).send(error);
            }
        });
    }
}

module.exports = new SerializationController();