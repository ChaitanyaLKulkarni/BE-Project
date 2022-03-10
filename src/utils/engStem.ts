import natural from "natural";
import Lemmatizer from "./lemmatizer";

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

function engStem(query: string): string[] {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(query);
    let lemmaWords = tokens.map((word) => {
        // TODO: return word witouth lemmanization if word is found in available words
        const res = lem.only_lemmas(word)[0];
        return res;
    });
    return lemmaWords.filter(
        (word) => !BLOCKED_WORDS.includes(word) && word && word.length > 0
    );
}

export default engStem;
