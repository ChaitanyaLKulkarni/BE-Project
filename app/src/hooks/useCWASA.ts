import { useEffect, useState } from "react";
import { ICWASA } from "../types/CWASA";

const WAIT_TIME = 1000;

const initCfg = {
    avsbsl: ["anna", "francoise", "luna", "marc", "siggi"],
    avSettings: {
        avList: "avsbsl",
        initAv: "luna",
        initSpeed: -3,
        rateSpeed: 4,
    },
};
type Props = {
    config?: any;
    autoReload?: boolean;
};
const useCWASA = ({ config = initCfg }: Props = {}): ICWASA | undefined => {
    const [CWASA, setCWASA] = useState<ICWASA>();
    // useEffect(() => {
    //     // const script = document.createElement("script");
    //     // script.src = "/jas/loc2022/cwa/allcsa.js";
    //     // script.async = true;
    //     // document.body.appendChild(script);
    //     // return () => {
    //     //     document.body.removeChild(script);
    //     // };
    // });

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
