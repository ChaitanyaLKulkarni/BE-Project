import engStem, { BLOCKED_WORDS } from "../../../src/utils/engStem";
import availableSymbolsCache from "../../../availableSymbols.json";

describe("EngStem", () => {
    it("should remove all blocked words", () => {
        for (const word of BLOCKED_WORDS) {
            expect(engStem(word, availableSymbolsCache)).toEqual([]);
        }
    });

    it("should remove puncutations", () => {
        expect(
            engStem("Hello, world!".toLowerCase(), availableSymbolsCache)
        ).toEqual(["hello", "world"]);
    });

    it("should get lemmas", () => {
        expect(
            engStem("i am riding bike".toLowerCase(), availableSymbolsCache)
        ).toEqual(["i", "ride", "bike"]);
    });

    it("should correctly stem words", () => {
        expect(
            engStem("hello, how are you?".toLowerCase(), availableSymbolsCache)
        ).toEqual(["hello", "how", "you"]);
    });
});
