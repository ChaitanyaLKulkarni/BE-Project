import mongoose from "mongoose";

export interface ILesson {
    _id?: mongoose.Types.ObjectId;
    description?: string;
    symbol: string;
    sigml: string;
}

export interface IChapter {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    difficulty: number;
    lessons: ILesson[];
}

const LessonSchema = new mongoose.Schema<ILesson>({
    description: String,
    symbol: String,
    sigml: String,
});

const ChapterSchema = new mongoose.Schema<IChapter>({
    title: String,
    description: String,
    difficulty: Number,
    lessons: [LessonSchema],
});

export default mongoose.models.Chapter ||
    mongoose.model("Chapter", ChapterSchema);
