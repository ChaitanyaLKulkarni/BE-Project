import type { NextApiRequest, NextApiResponse } from "next";
import { IChapterSaveResponse, IChaptersRepsonse } from "../../src/utils/types";
import dbConnect from "../../src/utils/dbConnect";
import Chapter, { IChapter } from "../../src/models/Chapter";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IChaptersRepsonse | IChapterSaveResponse>
) {
    const { method, body } = req;
    switch (method) {
        case "GET":
            await dbConnect();
            const chapters = await Chapter.find<IChapter>({});
            res.status(200).json({
                status_code: 200,
                data: {
                    total: chapters.length,
                    chapters,
                },
            });
            break;
        case "PUT":
            await dbConnect();
            if (body._id) {
                // Update Chapter Info
                const chapter = (await Chapter.findByIdAndUpdate(
                    body._id,
                    body,
                    { new: true }
                )) as IChapter;
                res.status(200).json({
                    status_code: 200,
                    data: {
                        chapter,
                    },
                });
            } else {
                const chapter = new Chapter(body);
                const resp = (await chapter.save()) as IChapter;
                console.log(resp);
                res.status(200).json({
                    status_code: 200,
                    data: {
                        chapter: resp,
                    },
                });
            }
    }
}
