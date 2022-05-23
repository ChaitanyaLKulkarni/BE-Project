import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../src/components/NavBar";
import routes from "../src/utils/routes";
import styles from "../styles/Home.module.css";

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Text to ISL</title>
            </Head>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title} data-testid="heading">
                        Text to Indian Sign Language conversion
                    </h2>
                    <div className={styles.decsription}>
                        <ul>
                            <li>
                                Indian Sign Language is used by 1.3 million
                                users. The proposed system gets input as text
                                and translates them to corresponding 3D ISL
                                animation.
                            </li>
                            <li>
                                This will help in solving the issue for deaf
                                community and to literate others about sign
                                language.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src="/img/Luna-removebg.png"
                        width={460}
                        height={380}
                        alt="Luna"
                    />
                    <Image
                        src="/img/marc-removebg.png"
                        width={420}
                        height={420}
                        alt="Mark"
                    />
                    <Link href={"routes.AvatarPage.path"}>
                        <a data-testid="link" className={styles.tryIt}>
                            <svg
                                width="235"
                                height="113"
                                viewBox="0 0 235 113"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={styles.tryItSvg}
                            >
                                <path
                                    d="M93.6742 69.8V95H88.8862L76.3222 79.7V95H70.5622V69.8H75.3862L87.9142 85.1V69.8H93.6742ZM108.456 95.288C106.416 95.288 104.58 94.868 102.948 94.028C101.34 93.164 100.08 91.976 99.1684 90.464C98.2564 88.952 97.8004 87.236 97.8004 85.316C97.8004 83.396 98.2564 81.68 99.1684 80.168C100.08 78.656 101.34 77.48 102.948 76.64C104.58 75.776 106.416 75.344 108.456 75.344C110.496 75.344 112.32 75.776 113.928 76.64C115.536 77.48 116.796 78.656 117.708 80.168C118.62 81.68 119.076 83.396 119.076 85.316C119.076 87.236 118.62 88.952 117.708 90.464C116.796 91.976 115.536 93.164 113.928 94.028C112.32 94.868 110.496 95.288 108.456 95.288ZM108.456 90.68C109.896 90.68 111.072 90.2 111.984 89.24C112.92 88.256 113.388 86.948 113.388 85.316C113.388 83.684 112.92 82.388 111.984 81.428C111.072 80.444 109.896 79.952 108.456 79.952C107.016 79.952 105.828 80.444 104.892 81.428C103.956 82.388 103.488 83.684 103.488 85.316C103.488 86.948 103.956 88.256 104.892 89.24C105.828 90.2 107.016 90.68 108.456 90.68ZM153.407 75.632L146.387 95H140.987L136.631 82.976L132.131 95H126.731L119.747 75.632H125.039L129.611 88.736L134.363 75.632H139.115L143.723 88.736L148.439 75.632H153.407Z"
                                    fill="#0A84FF"
                                    fillOpacity="0.77"
                                />
                                <path
                                    d="M233.241 56.182C234.998 54.4246 234.998 51.5754 233.241 49.818L204.603 21.1802C202.846 19.4228 199.996 19.4228 198.239 21.1802C196.482 22.9376 196.482 25.7868 198.239 27.5442L223.695 53L198.239 78.4558C196.482 80.2132 196.482 83.0624 198.239 84.8198C199.996 86.5772 202.846 86.5772 204.603 84.8198L233.241 56.182ZM9 57.5H230.059V48.5H9V57.5Z"
                                    fill="url(#paint0_linear_57_13)"
                                />
                                <path
                                    d="M70.6846 14.552H62.6206V9.8H84.5806V14.552H76.5166V35H70.6846V14.552ZM92.2646 18.188C92.9366 17.252 93.8366 16.544 94.9646 16.064C96.1166 15.584 97.4366 15.344 98.9246 15.344V20.528C98.3006 20.48 97.8806 20.456 97.6646 20.456C96.0566 20.456 94.7966 20.912 93.8846 21.824C92.9726 22.712 92.5166 24.056 92.5166 25.856V35H86.9006V15.632H92.2646V18.188ZM122.156 15.632L113.408 36.188C112.52 38.42 111.416 39.992 110.096 40.904C108.8 41.816 107.228 42.272 105.38 42.272C104.372 42.272 103.376 42.116 102.392 41.804C101.408 41.492 100.604 41.06 99.9798 40.508L102.032 36.512C102.464 36.896 102.956 37.196 103.508 37.412C104.084 37.628 104.648 37.736 105.2 37.736C105.968 37.736 106.592 37.544 107.072 37.16C107.552 36.8 107.984 36.188 108.368 35.324L108.44 35.144L100.052 15.632H105.848L111.284 28.772L116.756 15.632H122.156ZM134.643 15.632H140.259V35H134.643V15.632ZM137.451 12.932C136.419 12.932 135.579 12.632 134.931 12.032C134.283 11.432 133.959 10.688 133.959 9.8C133.959 8.912 134.283 8.168 134.931 7.568C135.579 6.968 136.419 6.668 137.451 6.668C138.483 6.668 139.323 6.956 139.971 7.532C140.619 8.108 140.943 8.828 140.943 9.692C140.943 10.628 140.619 11.408 139.971 12.032C139.323 12.632 138.483 12.932 137.451 12.932ZM157.963 34.064C157.411 34.472 156.727 34.784 155.911 35C155.119 35.192 154.279 35.288 153.391 35.288C151.087 35.288 149.299 34.7 148.027 33.524C146.779 32.348 146.155 30.62 146.155 28.34V20.384H143.167V16.064H146.155V11.348H151.771V16.064H156.595V20.384H151.771V28.268C151.771 29.084 151.975 29.72 152.383 30.176C152.815 30.608 153.415 30.824 154.183 30.824C155.071 30.824 155.827 30.584 156.451 30.104L157.963 34.064Z"
                                    fill="#0A84FF"
                                    fillOpacity="0.77"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_57_13"
                                        x1="-12.6483"
                                        y1="53.5006"
                                        x2="351.41"
                                        y2="53.4998"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop
                                            stopColor="#0A84FF"
                                            stopOpacity="0"
                                        />
                                        <stop offset="1" stopColor="#0A84FF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;
