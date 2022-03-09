import { useEffect, useState } from "react";
import { ICWASA } from "../utils/CWASA";

const WAIT_TIME = 1000;

const initCfg = {
    avsbsl: ["anna", "francoise", "luna", "marc", "siggi"],
    avSettings: { avList: "avsbsl", initAv: "luna" },
};

export default function useCWASA(config: any = initCfg) {
    const [CWASA, setCWASA] = useState<ICWASA>();

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "jas/loc2022/cwa/allcsa.js";
        script.async = true;
        script.id = "allcsa-script";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            (window as any).CWASA = undefined;
        };
    }, []);

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
}
