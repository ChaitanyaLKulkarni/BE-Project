const express = require("express");
const path = require("path");
const fs = require("fs");
const { engStem } = require("../src/engStem");

const SIGN_FIELS_PATH = path.join(__dirname, "SignFiles_small");
const PORT = 3000;
const app = express();

const availableSigml = fs
    .readdirSync(SIGN_FIELS_PATH)
    .filter((file) => file.endsWith(".sigml"))
    .map((file) => file.replace(".sigml", ""));

// app.use(express.static("public"));

app.get("/api/sign-files", (req, res) => {
    res.status(200).json(availableSigml);
});

app.get("/api/sign", (req, res) => {
    const query = req.query.q.toLocaleLowerCase();
    const words = engStem(query, availableSigml);
    let sigml = "<sigml>";
    const symbols = [];
    for (const word of words) {
        if (availableSigml.includes(word)) {
            sigml += fs
                .readFileSync(path.join(SIGN_FIELS_PATH, `${word}.sigml`))
                .toString()
                .replace(/<\/?sigml>|[\t\n\r]/g, "");
            symbols.push(word);
        } else {
            for (letter of word) {
                sigml += fs
                    .readFileSync(path.join(SIGN_FIELS_PATH, `${letter}.sigml`))
                    .toString()
                    .replace(/<\/?sigml>/g, "");
            }
            symbols.push([...word]);
        }
    }
    sigml += "</sigml>";
    res.status(200).json({ symbols, sigml });
});

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });
module.exports = app;
