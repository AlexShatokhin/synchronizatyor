const FileUtils = require('../utils/FileUtils');
const parseString = require("xml2js").parseString;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {sendEmail} = require('../services/EmailService');

class SerializationController {
    async handleJSON(req, res) {
        const data = req.body.data;
        const filename = `jsonResult.txt`;

        try {
            await FileUtils.writeFile(filename, data);
            await prisma.logs.create({
                data: {
                    status: 'success',
                    type: 'json',
                    message: 'JSON file has been saved successfully',
                    user_id: req.session.userId,
                },
            });
            if(req.body.email){
                sendEmail(req.body.email, 'JSON file has been saved successfully', 'The result is attached', filename);
            }
            res.send({ message: "JSON file has been saved successfully!" });
        } catch (error) {
            await prisma.logs.create({
                data: {
                    status: 'error',
                    message: `Error saving JSON file: ${error.message}`,
                    user_id: req.session.userId,
                    type: 'json',
                },
            });
            if(req.body.email){
                sendEmail(req.body.email, 'Error saving JSON file', error.message);
            }
            res.status(500).send({ error: "Error saving JSON file" });
        }
    }

    async handleXml(req, res) {
        parseString(req.body.data, async (err, result) => {
            if (err) {
                await prisma.logs.create({
                    data: {
                        status: 'error',
                        message: `Error parsing XML: ${err.message}`,
                        user_id: req.session.userId,
                        type: 'xml',
                    },
                });
                return res.status(500).send("Error parsing XML");
            }
            const filename = `xmlResult.txt`;

            try {
                await FileUtils.writeFile(filename, result);
                await prisma.logs.create({
                    data: {
                        status: 'success',
                        type: 'xml',
                        message: 'XML file has been saved successfully',
                        user_id: req.session.userId,
                        type: 'xml',
                    },
                });
                if(req.body.email){
                    sendEmail(req.body.email, 'XML file has been saved successfully', 'The result is attached', filename);
                }
                res.send({ message: "XML file has been saved successfully!" });
            } catch (error) {
                await prisma.logs.create({
                    data: {
                        status: 'error',
                        message: `Error saving XML file: ${error.message}`,
                        user_id: req.session.userId,
                        type: 'xml',
                    },
                });
                if(req.body.email){
                    sendEmail(req.body.email, 'Error saving XML file', error.message);
                }
                res.status(500).send({ error: "Error saving XML file" });
            }
        });
    }
}

module.exports = new SerializationController();