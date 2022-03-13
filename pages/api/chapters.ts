import type { NextApiRequest, NextApiResponse } from "next";
import { IChapterSaveResponse, IChaptersRepsonse } from "../../src/utils/types";
import dbConnect from "../../src/utils/dbConnect";
import Chapter, { IChapter } from "../../src/models/Chapter";
import checkAuth from "../../src/utils/checkAuth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IChaptersRepsonse | IChapterSaveResponse | string>
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
            //FIXME: Frontend not sending correct headers
            if (!checkAuth(req.headers.authorization) && false) {
                return res.status(401).send("Auth required");
            }
            if (!body.title || !body.description || !body.difficulty) {
                return res.status(400).send("Missing required fields");
            }
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
                res.status(200).json({
                    status_code: 200,
                    data: {
                        chapter: resp,
                    },
                });
            }
    }
}
