require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}
));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use("/api/", require("./routes/index"));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
