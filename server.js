import handler from "./handler.js";
import express from "express";
//import sqlite3 from "sqlite3";

const port = 8080;
const app = express();

app.use("/", express.static("static"));

app.use("/", express.json());
app.post("/", function (req, res) {
    // Handler returns promise for JS obj
    handler(req.body).then(function (responseObj) {
        // Send out promised obj
        res.json(responseObj);
    });
});

app.listen(port, function () {
    console.log("Listening on port " + port);
});
