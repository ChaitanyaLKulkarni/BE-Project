import React, { useState, useEffect, useRef, useCallback } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import useCWASA from "../src/hooks/useCWASA";
import usePlaySigml from "../src/hooks/usePlaySigml";
import styles from "../styles/Avatar.module.css";
import NavBar from "../src/components/NavBar";

import micSvg from "../public/img/mic.svg";
import micMuteSvg from "../public/img/mic-mute.svg";
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

    const { transcript, finalTranscript, listening } = useSpeechRecognition();

    const handleListing = () => {
        SpeechRecognition.startListening();
    };
    const stopHandle = () => {
        SpeechRecognition.stopListening();
    };

    useEffect(() => {
        setInpText(transcript);
    }, [transcript]);

    useEffect(() => {
        if (finalTranscript.length > 0) {
            requestAndPlaySiGML(finalTranscript);
        }
    }, [finalTranscript, requestAndPlaySiGML]);

    return (
        <>
            <Head>
                <title>Avatar</title>
            </Head>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.controlls}>
                    <textarea
                        className={styles.textarea}
                        placeholder="Enter English text here"
                        value={inpText}
                        onChange={(e) => setInpText(e.target.value)}
                        onKeyUp={(e) =>
                            e.ctrlKey &&
                            e.code == "Enter" &&
                            requestAndPlaySiGML(inpText)
                        }
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
                        <Image
                            src={listening ? micMuteSvg : micSvg}
                            width={30}
                            height={30}
                            alt="mic"
                            onClick={listening ? stopHandle : handleListing}
                        ></Image>
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
