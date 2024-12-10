const FileUtils = require('../utils/FileUtils');
const mysql = require("mysql2");
const { Client } = require("pg");

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
        } catch (err) {
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
            res.send(result.rows);
        } catch (err) {
            res.status(500).send("Error executing query");
        } finally {
            await client.end();
        }
    }
}

module.exports = new DatabaseController();