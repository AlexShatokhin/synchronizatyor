const routes = require("express").Router();
const mysql = require("mysql2");
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

routes.post("/mysql", async (req, res) => {
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
        fs.writeFile(filePath, JSON.stringify(result), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send(result);
        });
    } catch (err) {
        res.status(500).send("Error executing query");
    } finally {
        connection.end();
    }
});

routes.post("/postgres", async (req, res) => {
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
        fs.writeFile(filePath, JSON.stringify(result.rows), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send(result.rows);
        });
    } catch (err) {
        res.status(500).send("Error executing query");
    } finally {
        await client.end();
    }
});

module.exports = routes;

//TODO: mongoDB
//TODO: sqlite