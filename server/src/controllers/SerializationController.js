const FileUtils = require('../utils/FileUtils');
const path = require('path');
const ModifyingService = require("../services/ModifyingService");
const parseString = require("xml2js").parseString;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {sendEmail} = require('../services/EmailService');

class SerializationController {
    
    removeNewlines = (text) => {
        return text.replace(/\n/g, '').replace(/\r/g, '');
    }

    getJSON = async (req, res) => {
        const filePath = FileUtils.getPath("JSONResult.json");
        res.status(200).sendFile(filePath, (err) => {
            if (err) {
                console.error('Ошибка при отправке файла:', err);
                res.status(500).send('Ошибка при загрузке файла');
            }
        });
    }

    handleJSON = async (req, res) => {
        const data = JSON.parse(this.removeNewlines(req.body.data));
        const convertedData = ModifyingService.mapFields(Array.isArray(data) ? data : [data], req.body.mapping.data);
        const filename = `JSONResult.json`;

        try {
            await FileUtils.writeFile(filename, convertedData);
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

    getXML = async (req, res) => {
        const filePath = FileUtils.getPath("XMLResult.json");
        res.status(200).sendFile(filePath, (err) => {
            if (err) {
                console.error('Ошибка при отправке файла:', err);
                res.status(500).send('Ошибка при загрузке файла');
            }
        });
    }

    handleXML = (req, res) => {
        const data = this.removeNewlines(req.body.data);

        parseString(data, async (err, result) => {
            if (err) {
                await prisma.logs.create({
                    data: {
                        status: 'error',
                        message: `Error parsing XML: ${err.message}`,
                        user_id: req.session.userId,
                        type: 'xml',
                    },
                });
                return res.status(500).send({message: "Error parsing XML"});
            }
            const filename = `XMLResult.json`;

            try {
                const convertedData = ModifyingService.mapFields(Array.isArray(result) ? result : [result], req.body.mapping.data);
                await FileUtils.writeFile(filename, convertedData);
                await prisma.logs.create({
                    data: {
                        status: 'success',
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