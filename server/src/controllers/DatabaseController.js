const FileUtils = require('../utils/FileUtils');
const mysql = require("mysql2");
const { Client } = require("pg");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

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
                status: "SUCCESS",
                message: "Query executed successfully",
            })
            res.status(200).send("Query executed successfully");
        } catch (err) {
            await prisma.logs.create({
                status: "ERROR",
                message: err.message,
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
            await prisma.logs.create({
                status: "SUCCESS",
                message: "Query executed successfully",
            })
            res.status(200).send("Query executed successfully");
        } catch (err) {
            await prisma.logs.create({
                status: "ERROR",
                message: err.message,
            })
            res.status(500).send("Error executing query");
        } finally {
            await client.end();
        }
    }
}

module.exports = new DatabaseController();