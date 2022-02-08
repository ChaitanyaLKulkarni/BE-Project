const express = require("express");
const path = require("path");
const fs = require("fs");
const dbConnect = require("../src/dbConnect");
const HamNoSys = require("../src/models/HamNoSys");
const { engStem } = require("../src/engStem");
const getHamAndUnicode = require("../src/utils/hamToUnicode");

const SIGN_FIELS_PATH = path.join(__dirname, "SignFiles_small");
const PORT = 3000;
const app = express();

app.get("/api/save", async (req, res) => {
    // Read all files from SIGN_FIELS_PATH and save file name and content to database
    await dbConnect();
    const cache = {};
    let total = 0;
    const batch = [];

    const availableSigml = fs
        .readdirSync(SIGN_FIELS_PATH)
        .filter((file) => file.endsWith(".sigml"))
        .map((file) => file.replace(".sigml", ""));
    for (const file of availableSigml) {
        const filePath = path.join(SIGN_FIELS_PATH, file + ".sigml");
        const content = fs.readFileSync(filePath, "utf-8");
        const glosses = content.match(/<hns_sign (.*?)<\/hns_sign>/gis);
        for (const gloss of glosses) {
            const symbol = gloss.match(/gloss="(.*)"/i)[1].toLowerCase();
            if (cache[symbol]) {
                continue;
            }
            const hamContent = gloss.match(
                /<hamnosys_manual>(.*?)<\/hamnosys_manual>/s
            )[1];
            const hamNoSys = {
                symbol: symbol,
                ...getHamAndUnicode(hamContent, file),
            };
            batch.push(hamNoSys);
            total += 1;
        }
    }
    await HamNoSys.insertMany(batch);
    res.send(`${total} records saved`);
});

app.get("/api/all", async (req, res) => {
    await dbConnect();

    /* find all the data in our database */
    const result = await HamNoSys.find({});
    const hamNoSys = result.map((doc) => doc.toObject());
    res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
    res.status(200).json(hamNoSys);
});

app.get("/api/sign-files", async (req, res) => {
    await dbConnect();

    /* find all the data in our database */
    const result = await HamNoSys.find({});
    const hamNoSys = result.map((doc) => doc.symbol);
    res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
    res.status(200).json(hamNoSys);
});

function getSigml(sym) {
    if (!global.hamnosysCache) {
        throw new Error("Please run cache is Empty!..");
    }
    return `<hns_sign gloss="${sym}">
            <hamnosys_manual>
                ${hamnosysCache[sym].ham
                    .split(" ")
                    .map((ham) => `<${ham}/>`)
                    .join("")}
            </hamnosys_manual>
        </hns_sign>`;
}

app.get("/api/sign", async (req, res) => {
    const query = req.query.q.toLocaleLowerCase();
    let hamnosysCache;
    if (!global.hamnosysCache) {
        hamnosysCache = {};
        await dbConnect();
        const result = await HamNoSys.find({});
        result.forEach((doc) => {
            hamnosysCache[doc.symbol] = { unicode: doc.unicode, ham: doc.ham };
        });
        global.hamnosysCache = hamnosysCache;
    } else {
        hamnosysCache = global.hamnosysCache;
    }

    const words = engStem(query, hamnosysCache);
    let sigml = "<sigml>";
    const symbols = [];
    for (const word of words) {
        if (hamnosysCache[word]) {
            sigml += getSigml(word);
            symbols.push(word);
        } else {
            for (letter of word) {
                sigml += getSigml(letter);
            }
            symbols.push([...word]);
        }
    }
    sigml += "</sigml>";
    res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
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
