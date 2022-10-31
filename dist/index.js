"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, "../pages/index.html"));
});
app.get("/index.js", (req, res, next) => {
    res.status(200).sendFile(path_1.default.join(__dirname, "../dist/public/index.js"));
});
app.get("/amogus", (req, res) => {
    res.status(200).sendFile("/Users/tomstejskal/Desktop/marek.png");
});
app.get("/*", (req, res, next) => {
    res.status(200).sendFile(path_1.default.join(__dirname, `../public${req.url}`));
});
app.listen(5000, () => {
    console.log("listening on http://localhost:5000");
});
