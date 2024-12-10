const routes = require("express").Router();

const mysql = require("mysql2");

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

module.exports = routes;