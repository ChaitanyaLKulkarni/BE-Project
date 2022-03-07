import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import useCWASA from "../hooks/useCWASA";
import styles from "../styles/Avatar.module.css";

type Props = {};

export default function AvatarPage({}: Props) {
    const [CWASA] = useCWASA();
    const [fps, setFps] = useState(0);
    useEffect(() => {
        // CWASA?.addHook("avatarfps", ({ msg }) => {
        //     setFps(msg);
        // });
        const initCfg = {
            avsbsl: ["anna", "francoise", "luna", "marc", "siggi"],
            avSettings: { avList: "avsbsl", initAv: "luna" },
        };
        CWASA?.init(initCfg);
    }, [CWASA]);
    return (
        <>
            <Head>
                <title>Avatar</title>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link rel="stylesheet" href="jas/loc2022/cwa/cwasa.css" />
            </Head>
            <Script src="jas/loc2022/cwa/allcsa.js" />
            <div className={styles.container}>
                <div className={styles.controlls}>
                    <p className={styles.heading}>Text to ISL Converter</p>
                    <input
                        type="button"
                        value="Play SiGML Text"
                        className="bttnPlaySiGMLText av0"
                        style={{ display: "none" }}
                    />
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
                        name=""
                        id="textInp"
                        cols={30}
                        rows={5}
                        placeholder="Enter text"
                    ></textarea>
                    <br />
                    <br />
                    <br />
                    <input
                        type="text"
                        id="URLText"
                        className="txtaSiGMLText av0"
                        value=""
                        style={{ display: "none" }}
                    />
                    <input
                        className={`${styles.btn} ${styles.play}`}
                        type="button"
                        value="Play"
                        onClick={() => {
                            //stemAndPlay();
                            console.log("Steam and Play");
                        }}
                    />
                    &emsp;
                    <input
                        type="button"
                        value="Stop"
                        className={`bttnStop av0 ${styles.btn} ${styles.stop}`}
                    />
                    <br />
                    <br />
                </div>
                <div className={styles.avatarContainer}>
                    <div className="CWASAAvatar av0"></div>
                    <div className={styles.textContainer}></div>
                </div>
            </div>
        </>
    );
}
