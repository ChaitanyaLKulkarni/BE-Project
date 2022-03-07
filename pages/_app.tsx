import "../styles/globals.css";
// import "../public/jas/loc2022/cwa/cwasa.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
