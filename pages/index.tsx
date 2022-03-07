import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>ISl Converter</h1>
                <div className={styles.grid}>
                    <Link href="/avatar">
                        <a className={styles.card}>
                            <h2>ISL Converter</h2>
                            <p>
                                Play 3D animation of ISL from English senetence
                            </p>
                        </a>
                    </Link>
                    <Link href="/hamnosys">
                        <a className={styles.card}>
                            <h2>HamNoSys Editor</h2>
                            <p>Create, Modify and play HamNoSys</p>
                        </a>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Home;
