import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ICWASA } from "../utils/CWASA";

const WAIT_TIME = 1000;

const initCfg = {
    avsbsl: ["anna", "francoise", "luna", "marc", "siggi"],
    avSettings: { avList: "avsbsl", initAv: "luna" },
};

const useCWASA = (config: any = initCfg): ICWASA | undefined => {
    const [CWASA, setCWASA] = useState<ICWASA>();
    const router = useRouter();
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "jas/loc2022/cwa/allcsa.js";
        script.async = true;
        document.body.appendChild(script);

        // Need to do cause CWASA script leaves residue that can only be removed by reloading the page
        const onRouterChange = () => {
            router.reload();
        };
        router.events.on("routeChangeComplete", onRouterChange);

        return () => {
            router.events.off("routeChangeComplete", onRouterChange);

            document.body.removeChild(script);
        };
    }, [router]);

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
