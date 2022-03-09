import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { round } from "../src/utils/mathUtils";
import useCWASA from "../src/hooks/useCWASA";
import usePlaySigml from "../src/hooks/usePlaySigml";
import styles from "../styles/Avatar.module.css";

type Props = {};

export default function AvatarPage({}: Props) {
    const CWASA = useCWASA();
    const [fps, setFps] = useState(0);
    const [inpText, setInpText] = useState("");
    const { requestAndPlaySiGML, isLoading, isPlaying, signId, symbols } =
        usePlaySigml(CWASA);

    useEffect(() => {
        CWASA?.addHook("avatarfps", ({ msg }) => setFps(round(msg, 2)));
    }, [CWASA]);

    return (
        <>
            <Head>
                <title>Avatar</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.controlls}>
                    <p className={styles.heading}>Text to ISL Converter</p>
                    <label className={styles.label} htmlFor="menu">
                        Avatar: &emsp;
                    </label>
                    <span className="CWASAAvMenu av0" id="menu"></span>
                    <br />
                    <br />
                    <br />
                    <label className={styles.label} htmlFor="textInp">
                        Enter the Text: &emsp;
                    </label>
                    <textarea
                        className={styles.textarea}
                        cols={30}
                        rows={5}
                        placeholder="Enter text"
                        value={inpText}
                        onChange={(e) => setInpText(e.target.value)}
                    ></textarea>
                    <br />
                    <br />
                    <br />
                    <button
                        className={`${styles.btn} ${styles.play}`}
                        disabled={isPlaying || isLoading}
                        onClick={() => requestAndPlaySiGML(inpText)}
                    >
                        Play
                    </button>
                    &emsp;
                    <button
                        className={`${styles.btn} ${styles.stop}`}
                        disabled={!isPlaying || isLoading}
                        onClick={() => CWASA?.stopSiGML()}
                    >
                        Stop
                    </button>
                    <br />
                    <br />
                    FPS : {fps}
                </div>
                <div className={styles.avatarContainer}>
                    <div className="CWASAAvatar av0"></div>
                    <div className={styles.textContainer}>
                        {symbols.map((symbol) => {
                            return (
                                <pre
                                    key={symbol.idx}
                                    className={`${styles.symbol} ${
                                        signId === symbol.idx
                                            ? styles.highlight
                                            : ""
                                    }`}
                                >
                                    {symbol.symbol}
                                </pre>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
