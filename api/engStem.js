// const natural = require("natural");
const natural = require("natural");

const BLOCKED_WORDS = [
    "am",
    "are",
    "is",
    "was",
    "were",
    "be",
    "being",
    "been",
    "have",
    "has",
    "had",
    "does",
    "did",
    "could",
    "should",
    "would",
    "can",
    "shall",
    "will",
    "may",
    "might",
    "must",
    "let",
];

function engStem(query) {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(query);

    let lemmaWords = tokens.map((word) => {
        const res = natural.PorterStemmer.stem(word);
        return word.length > 4 ? res : word;
    });
    return lemmaWords.filter((word) => !BLOCKED_WORDS.includes(word));
}

module.exports = { BLOCKED_WORDS, engStem };
