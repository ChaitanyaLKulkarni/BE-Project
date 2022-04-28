import React from "react";
import { useRouter } from "next/router";
import routes from "../utils/routes";
import styles from "../../styles/NavBar.module.css";
import Link from "next/link";

type Props = {};

const NavBar = (props: Props) => {
    const router = useRouter();
    const currentPage = router.asPath;

    return (
        <div className={styles.container}>
            {Object.entries(routes).map(
                ([page, pageInfo]) =>
                    !pageInfo?.hidden && (
                        <Link href={pageInfo.path} key={pageInfo.title}>
                            <a
                                className={`${styles.link} ${
                                    currentPage === pageInfo.path
                                        ? styles.active
                                        : ""
                                }`}
                            >
                                {pageInfo.title}
                            </a>
                        </Link>
                    )
            )}
        </div>
    );
};

export default NavBar;
