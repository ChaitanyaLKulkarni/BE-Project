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

function auth(req, res, next) {
    const auth = { login: "admin", password: "password" }; // change this

    // parse login and password from headers
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const [login, password] = Buffer.from(b64auth, "base64")
        .toString()
        .split(":");

    // Verify login and password are set and correct
    if (
        login &&
        password &&
        login === auth.login &&
        password === auth.password
    ) {
        // Access granted...
        return next();
    }

    // Access denied...
    res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
    res.status(401).send("Authentication required."); // custom message
}

app.get("/ham", auth, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/hamnosys.html"));
});

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });
module.exports = app;
