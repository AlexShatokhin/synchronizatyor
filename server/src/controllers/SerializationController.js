const FileUtils = require('../utils/FileUtils');
const parseString = require("xml2js").parseString;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SerializationController {
    async handleJSON(req, res) {
        const data = req.body.data;
        const filename = `jsonResult_.txt`;

        try {
            await FileUtils.writeFile(filename, data);
            await prisma.logs.create({
                data: {
                    status: 'SUCCESS',
                    message: 'JSON file has been saved successfully',
                },
            });
            res.send({ message: "JSON file has been saved successfully!" });
        } catch (error) {
            await prisma.logs.create({
                data: {
                    status: 'ERROR',
                    message: `Error saving JSON file: ${error.message}`,
                },
            });
            res.status(500).send({ error: "Error saving JSON file" });
        }
    }

    async handleXml(req, res) {
        parseString(req.body.data, async (err, result) => {
            if (err) {
                await prisma.logs.create({
                    data: {
                        status: 'ERROR',
                        message: `Error parsing XML: ${err.message}`,
                    },
                });
                return res.status(500).send("Error parsing XML");
            }
            const filename = `xmlResult.txt`;

            try {
                await FileUtils.writeFile(filename, result);
                await prisma.logs.create({
                    data: {
                        status: 'SUCCESS',
                        message: 'XML file has been saved successfully',
                    },
                });
                res.send({ message: "XML file has been saved successfully!" });
            } catch (error) {
                await prisma.logs.create({
                    data: {
                        status: 'ERROR',
                        message: `Error saving XML file: ${error.message}`,
                    },
                });
                res.status(500).send({ error: "Error saving XML file" });
            }
        });
    }
}

module.exports = new SerializationController();