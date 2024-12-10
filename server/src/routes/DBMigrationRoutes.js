const routes = require("express").Router();

const mysql = require("mysql2");
const { Client } = require("pg");

routes.post("/mysql", async (req, res) => {
    const connection = mysql.createConnection({
        host: req.body.host,
        user: req.body.user,
        password: req.body.password,
        database: req.body.database
    })
    const ss = connection.promise();
    const [result] = await ss.query(req.body.query)
    connection.end();
    
    res.send(result)
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
        res.send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        await client.end();
    }
});

//TODO: mongoDB
//TODO: sqlite

module.exports = routes;