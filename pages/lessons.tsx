import React, { useEffect, useState } from "react";
import NavBar from "../src/components/NavBar";
import useCWASA from "../src/hooks/useCWASA";
import Chapter, { IChapter, ILesson } from "../src/models/Chapter";
import styles from "../styles/Lessons.module.css";

type Props = {
    chapters: IChapter[];
};

const LessonsPage = (props: Props) => {
    const CWASA = useCWASA();
    const [allChapters, setAllChapters] = useState(props.chapters);
    const [chapter, setChapter] = useState<IChapter | undefined>();
    const [lesson, setLesson] = useState<ILesson | undefined>();

    useEffect(() => {
        if (allChapters.length > 0) {
            setChapter(allChapters[0]);
        }
    }, [allChapters]);

    useEffect(() => {
        if (chapter) {
            setLesson(chapter.lessons[0]);
        }
    }, [chapter]);

    const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLesson(undefined);
        const selectedChapter = allChapters?.find(
            (l) => l.title === e.target.value
        );
        setChapter(selectedChapter);
    };

    const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lesson = chapter?.lessons?.find(
            (l) => l.symbol === e.target.value
        );
        setLesson(lesson);
    };

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.lessonsContainer}>
                    <select
                        onChange={handleChapterChange}
                        value={chapter?.title}
                    >
                        {allChapters?.map((ch) => (
                            <option key={ch._id?.toString()} value={ch.title}>
                                {ch.title}
                            </option>
                        ))}
                    </select>
                    {chapter && (
                        <select
                            onChange={handleLessonChange}
                            value={lesson?.symbol}
                        >
                            {chapter?.lessons.map((l) => (
                                <option
                                    key={l._id?.toString()}
                                    value={l.symbol}
                                >
                                    {l.symbol}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Chapter Info */}
                    <div className={styles.createChapter}>
                        <h2>Chapter Info</h2>
                        <br />
                        <div>
                            Title :{" "}
                            <span className={styles.infoText}>
                                {chapter?.title}
                            </span>
                        </div>
                        <br />
                        <div>
                            Description :{" "}
                            <span className={styles.infoText}>
                                {chapter?.description}
                            </span>
                        </div>
                        <br />
                        <div>
                            Difficulty :{" "}
                            <span className={styles.infoText}>
                                {chapter?.difficulty}
                            </span>
                        </div>
                        <br />
                        <div>
                            Lessons :{" "}
                            <span className={styles.infoText}>
                                {chapter?.lessons.length}
                            </span>
                        </div>
                        <br />
                    </div>
                    {/* Lesson Info */}
                    {lesson && (
                        <div className={styles.createChapter}>
                            <h2>Lesson Info</h2>
                            <br />
                            <div>
                                Symbol :{" "}
                                <span className={styles.infoText}>
                                    {lesson?.symbol}
                                </span>
                            </div>
                            <br />
                            <div>
                                Description :{" "}
                                <span className={styles.infoText}>
                                    {lesson?.description}
                                </span>
                            </div>
                            <br />
                            <button
                                onClick={() =>
                                    CWASA?.playSiGMLText(lesson?.sigml ?? "")
                                }
                            >
                                Play
                            </button>
                        </div>
                    )}
                </div>
                <div className={styles.avatarContainer}>
                    <div className="CWASAAvatar av0"></div>
                </div>
            </div>
        </>
    );
};

import dbConnect from "../src/utils/dbConnect";
export async function getStaticProps() {
    await dbConnect();
    const chapters = await Chapter.find<IChapter>({});
    return {
        props: {
            chapters: JSON.parse(JSON.stringify(chapters)),
        },
    };
}

export default LessonsPage;
