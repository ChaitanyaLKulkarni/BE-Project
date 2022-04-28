import type { NextApiRequest, NextApiResponse } from "next";
import { ISignResponse } from "../../src/utils/types";
import dbConnect from "../../src/utils/dbConnect";
import HamNoSys, { IHamNoSys } from "../../src/models/HamNoSys";
import engStem from "../../src/utils/engStem";

import hamnosysJson from "../../hamnosys.json";
import availableSymbolsCache from "../../availableSymbols.json";

let globalWithCache = global as typeof globalThis & {
    hamNoSys: { [key: string]: { unicode: string; ham: string } } | undefined;
    availableSymbols: string[];
};

function getSigml(sym: string) {
    if (!globalWithCache.hamNoSys) {
        throw new Error("cache is Empty!..");
    }

    return `<hns_sign gloss="${sym}"><hamnosys_manual>${globalWithCache.hamNoSys[
        sym
    ].ham
        .split(" ")
        .map((ham) => `<${ham}/>`)
        .join("")}</hamnosys_manual></hns_sign>`;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ISignResponse>
) {
    if (!req.query.q) {
        res.status(400).json({
            status_code: 400,
            message: "query is required",
        });
    }
    const query = req.query.q.toString().toLowerCase();
    let hamnosysCache: { [key: string]: { unicode: string; ham: string } } = {};
    let availableSymbols: string[] = [];
    if (!globalWithCache.hamNoSys) {
        // await dbConnect();
        // const result = await HamNoSys.find<IHamNoSys>({});
        // result.forEach((doc) => {
        //     availableSymbols.push(doc.symbol);
        //     hamnosysCache[doc.symbol] = { unicode: doc.unicode, ham: doc.ham };
        // });
        hamnosysCache = hamnosysJson;
        availableSymbols = availableSymbolsCache;

        globalWithCache.hamNoSys = hamnosysCache;
        globalWithCache.availableSymbols = availableSymbols;
    } else {
        hamnosysCache = globalWithCache.hamNoSys;
        availableSymbols = globalWithCache.availableSymbols;
    }

    const words = engStem(query, availableSymbols);
    let sigml = "<sigml>";
    const symbols: string[][] = [];
    for (const word of words) {
        if (hamnosysCache[word]) {
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
    res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
    res.status(200).json({
        status_code: 200,
        data: { symbols, sigml },
    });
}
