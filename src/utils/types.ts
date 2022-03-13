import { IChapter } from "../models/Chapter";
export interface ISignResponse {
    status_code: number;
    message?: string;
    data?: { symbols: string[][]; sigml: string };
}

export interface IChaptersRepsonse {
    status_code: number;
    message?: string;
    data?: {
        chapters: IChapter[];
        total: number;
    };
}

export interface IChapterSaveResponse {
    status_code: number;
    message?: string;
    data?: {
        chapter: IChapter;
    };
}
