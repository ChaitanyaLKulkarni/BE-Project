import natural from "natural";
import Lemmatizer from "./lemmatizer";

export const BLOCKED_WORDS = [
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
    "do",
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

function engStem(query: string, availableSymbols: string[]): string[] {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(query);
    let lemmaWords = tokens.map((word) => {
        if (availableSymbols.includes(word.toLowerCase())) {
            return word;
        }
        const res = lem.only_lemmas(word)[0];
        return res;
    });
    return lemmaWords.filter(
        (word) => !BLOCKED_WORDS.includes(word) && word && word.length > 0
    );
}

export default engStem;
