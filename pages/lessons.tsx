import React, { useEffect, useState } from "react";
import NavBar from "../src/components/NavBar";
import useCWASA from "../src/hooks/useCWASA";
import usePlaySigml from "../src/hooks/usePlaySigml";
import Chapter, { IChapter, ILesson } from "../src/models/Chapter";
import styles from "../styles/Lessons.module.css";

type Props = {
    chapters: IChapter[];
};

const LessonsPage = (props: Props) => {
    const CWASA = useCWASA();
    const { isPlaying, playSigmlText, stopPlaying } = usePlaySigml(CWASA);
    const [allChapters, _] = useState(props.chapters);
    const [chapter, setChapter] = useState<IChapter | undefined>();
    const [lesson, setLesson] = useState<ILesson | undefined>();

    const handleChapterChange = (c: IChapter) => {
        setLesson(undefined);
        if (c._id === chapter?._id) setChapter(undefined);
        else setChapter(c);
    };

    const handleLessonChange = (l: ILesson) => {
        if (l._id === lesson?._id) {
            setLesson(undefined);
            stopPlaying();
        } else {
            setLesson(l);
            playSigmlText(l.sigml);
        }
    };

    useEffect(() => {
        if (isPlaying) return;
        setLesson(undefined);
    }, [isPlaying]);

    return (
        <>
            <Head>
                <title>Lessons - Learn to sign</title>
            </Head>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.lessonsContainer}>
                    {allChapters.map((c) => (
                        <div key={c.title} className={styles.chapterContainer}>
                            <div
                                className={`${styles.chapterInfo} ${
                                    chapter?._id === c._id
                                        ? styles.selected
                                        : ""
                                }`}
                                onClick={() => handleChapterChange(c)}
                                title={c.description}
                            >
                                <span>
                                    Chapter: {c.title}
                                    <br />
                                    <span className={styles.smallText}>
                                        {c.description}
                                    </span>
                                </span>
                            </div>
                            {chapter?.title === c.title && (
                                <div className={styles.chapterLessons}>
                                    {c.lessons.map((l) => (
                                        <div
                                            key={l.symbol}
                                            className={`${styles.lessonInfo} ${
                                                lesson?._id === l._id
                                                    ? styles.LessonSelected
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleLessonChange(l)
                                            }
                                            title={l.description}
                                        >
                                            {l.symbol}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.avatarContainer}>
                    <div className="CWASAAvatar av0"></div>
                    <div className={styles.speedController}>
                        <input
                            type="text"
                            className={`txtLogSpeed av0 ${styles.speedInp}`}
                        />
                        <input
                            type="button"
                            value="-"
                            className={`bttnSpeedDown av0 ${styles.speedBtn}`}
                        />
                        <input
                            type="button"
                            value="+"
                            className={`bttnSpeedUp av0 ${styles.speedBtn}`}
                        />
                        <input
                            type="button"
                            value="Reset"
                            className={`bttnSpeedReset av0 ${styles.speedBtn} ${styles.resetBtn}`}
                            disabled
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

import dbConnect from "../src/utils/dbConnect";
import Head from "next/head";
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
