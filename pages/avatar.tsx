import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import useCWASA from "../src/hooks/useCWASA";
import { round } from "../src/utils/mathUtils";
import styles from "../styles/Avatar.module.css";
import { ISignResponse } from "../src/utils/types";

type Props = {};
type Symbol = { symbol: string; idx: number };
export default function AvatarPage({}: Props) {
    const [CWASA] = useCWASA();
    const [fps, setFps] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [inpText, setInpText] = useState("");
    const [symbols, setSymbols] = useState([] as Symbol[]);
    const [signId, seSignId] = useState(0);

    const requestAndPlaySiGML = async () => {
        fetch(
            "/api/sign?" +
                new URLSearchParams({
                    q: inpText,
                }).toString()
        )
            .then((resp) => resp.json())
            .then((data: ISignResponse) => {
                if (data.status_code !== 200) return;
                console.log(data);
                let i = 0;
                const symbols: Symbol[] = [];
                data.data?.symbols.forEach((symbol) => {
                    for (let j = 0; j < symbol.length; j++) {
                        const sym = symbol[j];
                        symbols.push({ symbol: sym, idx: i++ });
                    }
                });
                setSymbols(symbols);
                CWASA?.playSiGMLText(data.data?.sigml ?? "");
            })
            .catch((err) => {
                window.alert("Something went wrong!...");
                console.error(err);
            });
    };

    useEffect(() => {
        const initCfg = {
            avsbsl: ["anna", "francoise", "luna", "marc", "siggi"],
            avSettings: { avList: "avsbsl", initAv: "luna" },
        };
        CWASA?.init(initCfg);
        CWASA?.addHook("avatarfps", ({ msg }) => setFps(round(msg, 2)));
        CWASA?.addHook("animactive", () => setIsPlaying(true));
        CWASA?.addHook("animidle", () => setIsPlaying(false));
        CWASA?.addHook("avatarsign", (e) => {
            // {typ: "avatarsign", msg: {g: 'your', f: 1, s: 0}, av: 0}
            seSignId(e.msg.s);
        });
        // CWASA?.addHook("status", console.log);
    }, [CWASA]);

    return (
        <>
            <Head>
                <title>Avatar</title>
            </Head>
            <Script src="jas/loc2022/cwa/allcsa.js" />
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
                        disabled={isPlaying}
                        onClick={requestAndPlaySiGML}
                    >
                        Play
                    </button>
                    &emsp;
                    <button
                        className={`${styles.btn} ${styles.stop}`}
                        disabled={!isPlaying}
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
                                <span
                                    key={symbol.idx}
                                    className={`${styles.symbol} ${
                                        signId === symbol.idx
                                            ? styles.highlight
                                            : ""
                                    }`}
                                >
                                    {symbol.symbol}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
