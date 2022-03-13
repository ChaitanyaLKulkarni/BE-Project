import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ICWASA } from "../utils/CWASA";

const WAIT_TIME = 1000;

const initCfg = {
    avsbsl: ["anna", "francoise", "luna", "marc", "siggi"],
    avSettings: { avList: "avsbsl", initAv: "luna" },
};
type Props = {
    config?: any;
    autoReload?: boolean;
};
const useCWASA = ({ config = initCfg, autoReload = true }: Props = {}):
    | ICWASA
    | undefined => {
    const [CWASA, setCWASA] = useState<ICWASA>();
    const router = useRouter();
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/jas/loc2022/cwa/allcsa.js";
        script.async = true;
        document.body.appendChild(script);
        // Need to do cause CWASA script leaves residue that can only be removed by reloading the page
        function onRouterChange(newPath: string) {
            if (!autoReload) return;
            window.location.href = router.basePath + newPath;
        }

        // router.events.on("routeChangeComplete", onRouterChange);
        router.events.on("routeChangeStart", onRouterChange);

        return () => {
            router.events.off("routeChangeStart", onRouterChange);
            document.body.removeChild(script);
        };
    }, [router, autoReload]);

    useEffect(() => {
        const checkAndSet = () => {
            const _CWASA = (window as any).CWASA as ICWASA;
            if (!_CWASA) {
                setTimeout(checkAndSet, WAIT_TIME);
                return;
            }
            setCWASA(_CWASA);
            if (config) {
                _CWASA.init(config);
            }
        };
        checkAndSet();
    }, [config]);
    return CWASA;
};

export default useCWASA;
