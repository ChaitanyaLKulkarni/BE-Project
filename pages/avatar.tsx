import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import useCWASA from "../src/hooks/useCWASA";
import usePlaySigml from "../src/hooks/usePlaySigml";
import styles from "../styles/Avatar.module.css";
import NavBar from "../src/components/NavBar";

type Props = {};

const AvatarPage: NextPage = ({}: Props) => {
    const CWASA = useCWASA();
    const [inpText, setInpText] = useState("");
    const {
        requestAndPlaySiGML,
        stopPlaying,
        isLoading,
        isPlaying,
        signId,
        symbols,
    } = usePlaySigml(CWASA);

    return (
        <>
            <Head>
                <title>Avatar</title>
            </Head>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.controlls}>
                    {/* <p className={styles.heading}>Text to ISL Converter</p>
                    <label className={styles.label} htmlFor="menu">
                        Avatar: &emsp;
                    </label>
                    <span className="CWASAAvMenu av0" id="menu"></span>
                    <label className={styles.label} htmlFor="textInp">
                        Enter the Text: &emsp;
                    </label> */}
                    <textarea
                        className={styles.textarea}
                        placeholder="Enter English text here"
                        value={inpText}
                        onChange={(e) => setInpText(e.target.value)}
                    ></textarea>
                    <div className={styles.btnsContainer}>
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
                            onClick={stopPlaying}
                        >
                            Pause
                        </button>
                    </div>
                </div>
                <div style={{ flex: 0.5 }} /> {/* spacer */}
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
};

export default AvatarPage;
