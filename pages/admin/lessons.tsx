import React, { useEffect, useState } from "react";
import NavBar from "../../src/components/NavBar";
import useCWASA from "../../src/hooks/useCWASA";
import { IChapterSaveResponse, IChaptersRepsonse } from "../../src/utils/types";
import { IChapter, ILesson } from "../../src/models/Chapter";
import styles from "../../styles/Lessons.module.css";

type Props = {};

const LessonsAdminPage = (props: Props) => {
    const [allChapters, setAllChapters] = useState<IChapter[]>([]);
    const [chapter, setChapter] = useState<IChapter | undefined>();
    const [lesson, setLesson] = useState<ILesson | undefined>();

    const [chapterTitle, setChapterTitle] = useState<string | undefined>("");
    const [chapterDesc, setChapterDesc] = useState<string | undefined>("");
    const [chapterDifficulty, setChapterDifficulty] = useState<number>(1);

    const [lessonDesc, setLessonDesc] = useState<string | undefined>("");
    const [lessonSymbol, setLessonSymbol] = useState<string | undefined>("");
    const [lessonSigml, setLessonSigml] = useState<string | undefined>("");

    useEffect(() => {
        async function fetchData() {
            const resp: IChaptersRepsonse = await fetch("/api/chapters").then(
                (r) => r.json()
            );
            if (resp.status_code !== 200) {
                window.alert("Something Went Wrong!!!");
                return;
            }
            setAllChapters(resp.data?.chapters ?? []);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setChapterTitle(chapter?.title);
        setChapterDesc(chapter?.description);
        setChapterDifficulty(chapter?.difficulty ?? 1);
    }, [chapter]);

    useEffect(() => {
        setLessonDesc(lesson?.description);
        setLessonSymbol(lesson?.symbol);
        setLessonSigml(lesson?.sigml);
    }, [lesson]);

    const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLesson(undefined);
        if (e.target.value === "CREATE_NEW") {
            setChapter(undefined);
            return;
        }
        const selectedChapter = allChapters?.find(
            (l) => l.title === e.target.value
        );
        setChapter(selectedChapter);
    };

    const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "CREATE_NEW") {
            setLesson(undefined);
            return;
        }
        const lesson = chapter?.lessons?.find(
            (l) => l.symbol === e.target.value
        );
        setLesson(lesson);
    };

    const handleChapterSave = async () => {
        if (!chapterTitle || !chapterDesc) {
            window.alert("Please fill all the fields");
            return;
        }

        const respData = (await fetch("/api/chapters", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: chapter?._id,
                title: chapterTitle,
                description: chapterDesc,
                difficulty: chapterDifficulty,
                lessons: [],
            } as IChapter),
        }).then((resp) => resp.json())) as IChapterSaveResponse;

        if (respData.status_code !== 200) {
            window.alert("Something Went Wrong!!!");
            return;
        }
        if (!chapter)
            setAllChapters([...(allChapters as any[]), respData.data?.chapter]);
        else
            setAllChapters((current) => {
                for (let index = 0; index < allChapters.length; index++) {
                    if (allChapters[index]._id === respData.data?.chapter._id) {
                        current[index] = respData.data?.chapter as IChapter;
                        return current;
                    }
                }
                return current;
            });
        setChapter(respData.data?.chapter);
    };

    const handleLessonSave = async () => {
        if (!lessonSymbol || !lessonSigml) {
            window.alert("Please fill all the fields");
            return;
        }
        const updatedChapter = {
            ...chapter,
            lessons: [
                ...(chapter?.lessons ?? []),
                {
                    symbol: lessonSymbol,
                    sigml: lessonSigml,
                    description: lessonDesc,
                },
            ],
        };
        const respData = (await fetch("/api/chapters", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedChapter),
        }).then((resp) => resp.json())) as IChapterSaveResponse;

        if (respData.status_code !== 200) {
            window.alert("Something Went Wrong!!!");
            return;
        }
        setAllChapters((current) => {
            for (let index = 0; index < allChapters.length; index++) {
                if (allChapters[index]._id === respData.data?.chapter._id) {
                    current[index] = respData.data?.chapter as IChapter;
                    return current;
                }
            }
            return current;
        });
        setChapter(respData.data?.chapter);
        setLesson(respData.data?.chapter?.lessons?.at(-1));
    };

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.lessonsContainer}>
                    <select onChange={handleChapterChange}>
                        <option value="CREATE_NEW" selected={!chapter}>
                            Create new
                        </option>
                        {allChapters?.map((ch) => (
                            <option
                                key={ch._id?.toString()}
                                value={ch.title}
                                selected={ch.title === chapter?.title}
                            >
                                {ch.title}
                            </option>
                        ))}
                    </select>
                    {chapter && (
                        <select onChange={handleLessonChange}>
                            <option value="CREATE_NEW" selected={!lesson}>
                                Create new
                            </option>
                            {chapter?.lessons.map((l) => (
                                <option
                                    key={l._id?.toString()}
                                    value={l.symbol}
                                    selected={l.symbol === lesson?.symbol}
                                >
                                    {l.symbol}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                {/* Chapter Info */}
                <div className={styles.createChapter}>
                    <h2>Chapter Info</h2>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Chapter Title"
                        onChange={(e) => {
                            setChapterTitle(e.target.value);
                        }}
                        value={chapterTitle}
                    />
                    <input
                        type="text"
                        placeholder="Enter Description"
                        onChange={(e) => {
                            setChapterDesc(e.target.value);
                        }}
                        value={chapterDesc}
                    />
                    <input
                        type="number"
                        placeholder="Enter Difficulty"
                        onChange={(e) => {
                            setChapterDifficulty(Number(e.target.value));
                        }}
                        value={chapterDifficulty}
                    />

                    <button onClick={handleChapterSave}>
                        {!chapter ? "Create" : "Update"}
                    </button>
                </div>
                {/* Lesson Info */}
                {chapter && (
                    <div className={styles.createChapter}>
                        <h2>Lesson Info</h2>
                        <br />
                        <input
                            type="text"
                            placeholder="Enter Lesson Symbol"
                            onChange={(e) => {
                                setLessonSymbol(e.target.value);
                            }}
                            value={lessonSymbol}
                        />
                        <input
                            type="text"
                            placeholder="Enter Description"
                            onChange={(e) => {
                                setLessonDesc(e.target.value);
                            }}
                            value={lessonDesc}
                        />
                        <textarea
                            placeholder="Enter sigml"
                            onChange={(e) => {
                                setLessonSigml(e.target.value);
                            }}
                            value={lessonSigml}
                        />

                        <button onClick={handleLessonSave}>
                            {!lesson ? "Create" : "Update"}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default LessonsAdminPage;
