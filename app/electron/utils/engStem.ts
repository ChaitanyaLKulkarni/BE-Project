import { WordTokenizer } from "natural";
import Lemmatizer from "./lemmatizer";
import blockedWords from "./blockedWords.json";
export const BLOCKED_WORDS = blockedWords;

const lem = new Lemmatizer();

function engStem(query: string, availableSymbols: string[]): string[] {
    const tokenizer = new WordTokenizer();
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
