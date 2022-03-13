import type { NextApiRequest, NextApiResponse } from "next";
// import fs from "fs";
// import HamNoSys, { IHamNoSys } from "../../src/models/HamNoSys";
// import dbConnect from "../../src/utils/dbConnect";
// import { getHamAndUnicode } from "../../src/utils/hamnosys";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ status_code: number; data: string }>
) {
    res.send({ status_code: 200, data: "BLOCKED" });
    return;
    // await dbConnect();
    // const cache = new Map<string, string>();
    // let total = 0;
    // const batch: IHamNoSys[] = [];
    // const data = require("../../signdump.json");

    // for (const sign of data) {
    //     const { w: symbol, s: sigml }: { w: string; s: string } = sign;
    //     if (cache.has(symbol)) {
    //         console.log(`${symbol} already exists`);
    //         fs.appendFileSync(
    //             "./duplicate.txt",
    //             `${symbol}\n\n\t${cache.get(
    //                 symbol
    //             )}\n\n\t${sigml}\n\n--------\n`
    //         );
    //         continue;
    //     }

    //     const matches = sigml.match(
    //         /<hamnosys_manual>(.*?)<\/hamnosys_manual>/s
    //     );
    //     if (!matches) {
    //         console.log(`${symbol} has no manual`);
    //         fs.appendFileSync(
    //             "./no_manual.txt",
    //             `${symbol}\n\n\t${sigml}\n\n--------\n`
    //         );
    //         continue;
    //     }
    //     total += 1;

    //     const manualSigns = matches[1];

    //     cache.set(symbol, sigml);

    //     const { unicode, ham } = getHamAndUnicode(manualSigns, symbol);
    //     batch.push({
    //         symbol,
    //         ham,
    //         unicode,
    //     });
    // }
    // console.log("Total Signs:", total);
    // fs.writeFileSync("./op.json", JSON.stringify(batch, null, 2));
    // const resp = await HamNoSys.insertMany(batch);
    // // res.send(`${total} records saved`);
    // res.send({ status_code: 200, data: `Wrote ${resp.length} records` });
}
