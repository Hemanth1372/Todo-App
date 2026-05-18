import express from "express";
import {Client} from "pg";
import cors from "cors";
import morgan from "morgan";

const port = process.env.PORT || 3000;

const app = express();
const db = new Client({
    username: process.env.USERNAME,
    host : process.env.HOST,
    database : process.env.DATABASE,
    password : process.env.PASSWORD,
    port : process.env.DB_PORT,
});

db.connect();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.post("/register", async(req, res) => {
    const {username, password, repassword} = req.body;
    try {
        const response = await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", 
            [username, password]
        );
        if(response != null) {
            res.status(200);
        } else {
            res.status(300).send("Not registered, try again");
        }
    } catch(err) {
        res.status(500).send("Error occured, try again");
    }
});

app.post("/submit", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{ 
        const response = await db.query("SELECT * FROM users WHERE username=$1", [username]);
        const {user, pwd} = response;
        if(pwd === password) {
            res.send("User Authentication successsful, Welcome to our website!");
        } else {
            console.log("User is not Correct!");
            res.status(301);
        }
    } catch (err) {
        res.send("Error occured")
    }

    db.end();
});

app.listen(port, () => {
    console.log(`Server listening on the port : ${port}`);
})