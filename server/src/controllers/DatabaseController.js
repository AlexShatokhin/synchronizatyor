const FileUtils = require('../utils/FileUtils');
const mysql = require("mysql2");
const { Client } = require("pg");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const {sendEmail} = require("../services/EmailService")

class DatabaseController {
    async handleMySQL(req, res){
        const connection = mysql.createConnection({
            host: req.body.host,
            user: req.body.user,
            password: req.body.password,
            database: req.body.database
        });
        const ss = connection.promise();
        try {
            const [result] = await ss.query(req.body.query);
            const filePath = path.join(__dirname, `result.txt`);
            await FileUtils.writeFile(filePath, JSON.stringify(result));
            await prisma.logs.create({
                status: "success",
                type: "mysql",
                message: "Query executed successfully",
                user_id: req.session.userId
            })
            if(req.body.email){
                sendEmail(req.body.email, "Query executed successfully", "The result is attached", filePath);
            }
            res.status(200).send("Query executed successfully");
        } catch (err) {
            if(req.body.email){
                sendEmail(req.body.email, "Error executing query", err.message);
            }
            await prisma.logs.create({
                status: "error",
                message: err.message,
                user_id: req.session.userId
            })
            res.status(500).send("Error executing query");
        } finally {
            connection.end();
        }
    }

    async handlePostgres(req, res){
        const client = new Client({
            host: req.body.host,
            user: req.body.user,
            password: req.body.password,
            database: req.body.database
        });
    
        try {
            await client.connect();
            const result = await client.query(req.body.query);
            const filePath = path.join(__dirname, `result.txt`);
            await FileUtils.writeFile(filePath, JSON.stringify(result.rows));
            if(req.body.email){
                sendEmail(req.body.email, "Query executed successfully", "The result is attached", filePath);
            }
            await prisma.logs.create({
                status: "success",
                message: "Query executed successfully",
                type: "postgres",
                user_id: req.session.userId
            })
            res.status(200).send("Query executed successfully");
        } catch (err) {
            if(req.body.email){
                sendEmail(req.body.email, "Error executing query", err.message);
            }
            await prisma.logs.create({
                status: "error",
                message: err.message,
                user_id: req.session.userId
            })
            res.status(500).send("Error executing query");
        } finally {
            await client.end();
        }
    }
}

module.exports = new DatabaseController();