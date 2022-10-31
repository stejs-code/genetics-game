import express from "express";
import fs from "node:fs";
import path from "path";

const app = express();
app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../pages/index.html"));
})

app.get("/index.js", (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "../dist/public/index.js"))
})
app.get("/*", (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, `../public${req.url}`))

})

app.listen(5000, () => {
    console.log("listening on http://localhost:5000")
})