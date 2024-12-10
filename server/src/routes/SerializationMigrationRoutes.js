const routes = require("express").Router();
const parseString = require("xml2js").parseString;
const fs = require("fs");
const path = require("path");

routes.post("/json", (req, res) => {
    const data = req.body.data;
    const filePath = path.join(__dirname, `result.txt`);
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            return res.status(500).send("Error writing file");
        }
        res.send(data);
    });
});

routes.post("/xml", (req, res) => {
    parseString(req.body.data, (err, result) => {
        if (err) {
            return res.status(500).send("Error parsing XML");
        }
        const filePath = path.join(__dirname, `result.txt`);

        fs.writeFile(filePath, JSON.stringify(result), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send(result);
        });
    });
});

module.exports = routes;