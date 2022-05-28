import engStem from "./utils/engStem";

import hamnosysJson from "./hamnosys.json";
import availableSymbolsCache from "./availableSymbols.json";

const hamNoSys: { [key: string]: { unicode: string; ham: string } } =
    hamnosysJson;
let availableSymbols: string[] = availableSymbolsCache;

function getSigml(sym: string) {
    if (!hamNoSys) {
        throw new Error("cache is Empty!..");
    }

    return `<hns_sign gloss="${sym}"><hamnosys_manual>${hamNoSys[sym].ham
        .split(" ")
        .map((ham) => `<${ham}/>`)
        .join("")}</hamnosys_manual></hns_sign>`;
}

export default async function stemAndGetSigml(q: string) {
    const query = q.toLowerCase();

    const words = engStem(query, availableSymbols);
    let sigml = "<sigml>";
    const symbols: string[][] = [];
    for (const word of words) {
        if (hamNoSys[word]) {
            sigml += getSigml(word);
            symbols.push([word]);
        } else {
            for (let i = 0; i < word.length; i++) {
                const letter = word.charAt(i);
                sigml += getSigml(letter);
            }
            symbols.push([...word]);
        }
    }
    sigml += "</sigml>";

    return { symbols, sigml };
}
