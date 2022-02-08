const symToUnicode = require("../symToUnicode.json");

function getHamAndUnicode(hamContent, filename) {
    let hamSym = "";
    let hamUnicode = "";
    for (const sym of hamContent.match(/<(.*)\/>/g)) {
        const symbol = sym.replace(/<|\/>/g, "");
        const unicode = symToUnicode[symbol];
        if (unicode) {
            hamUnicode += unicode + " ";
            hamSym += symbol + " ";
        } else {
            throw new Error(`${symbol} not found from file ${filename}`);
        }
    }
    return { unicode: hamUnicode.trim(), ham: hamSym.trim() };
}
module.exports = getHamAndUnicode;
