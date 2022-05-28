import React, { useState, useEffect, useRef, useCallback } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import useCWASA from "./hooks/useCWASA";
import usePlaySigml from "./hooks/usePlaySigml";

import micSvg from "./img/mic.svg";
import micMuteSvg from "./img/mic-mute.svg";
import styles from "./styles/Avatar.module.css";

type Props = {};

const AvatarPage: React.FC<Props> = () => {
    const CWASA = useCWASA();
    const [inpText, setInpText] = useState("");
    const [sTranscribed, setSTranscribed] = useState([] as String[]);
    const {
        requestAndPlaySiGML,
        stopPlaying,
        isLoading,
        isPlaying,
        signId,
        symbols,
    } = usePlaySigml(CWASA);

    const {
        transcript,
        finalTranscript,
        listening,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

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

    useEffect(() => {
        (window as any).api.onTrascribe((txt: String) =>
            setSTranscribed((p) => [...p, txt])
        );
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.controlls}>
                    <textarea
                        className={styles.textarea}
                        placeholder="Enter English text here"
                        value={inpText}
                        onChange={(e) => setInpText(e.target.value)}
                        onKeyUp={(e) =>
                            e.ctrlKey &&
                            e.code === "Enter" &&
                            requestAndPlaySiGML(inpText)
                        }
                    ></textarea>
                    {browserSupportsSpeechRecognition
                        ? "support"
                        : "not support"}
                    <div className={styles.btnsContainer}>
                        <button
                            className={`${styles.btn} ${styles.play}`}
                            // disabled={isPlaying || isLoading}
                            onClick={() => requestAndPlaySiGML(inpText)}
                        >
                            Play
                        </button>
                        &emsp;
                        <img
                            src={listening ? micMuteSvg : micSvg}
                            width={30}
                            height={30}
                            alt="mic"
                            onClick={listening ? stopHandle : handleListing}
                        ></img>
                        &emsp;
                        <button
                            className={`${styles.btn} ${styles.stop}`}
                            disabled={!isPlaying || isLoading}
                            onClick={stopPlaying}
                        >
                            Pause
                        </button>
                    </div>
                    {sTranscribed.map((txt, i) => (
                        <div key={i}>
                            <span>{txt}</span>
                            <br />
                        </div>
                    ))}
                </div>
                <div style={{ flex: 0.5 }} /> {/* spacer */}
                <div className={`${styles.avatarContainer}`}>
                    <div className="CWASAAvatar av0"></div>
                    <div className={`${styles.textContainer}`}>
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
