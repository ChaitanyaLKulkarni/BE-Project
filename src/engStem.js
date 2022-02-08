const natural = require("natural");
const Lemmatizer = require("./lemmatizer");
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

const lem = new Lemmatizer();

function engStem(query, availableSigml) {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(query);
    let lemmaWords = tokens.map((word) => {
        if (availableSigml[word]) return word;
        // const res = natural.PorterStemmer.stem(word);
        const res = lem.only_lemmas(word)[0];
        // console.log({ res, res2 });
        return res;
    });
    return lemmaWords.filter(
        (word) => !BLOCKED_WORDS.includes(word) && word.length > 0
    );
}

module.exports = { BLOCKED_WORDS, engStem };
