import { useEffect, useState } from "react";
import { ICWASA } from "../utils/CWASA";

const WAIT_TIME = 1000;
export default function useCWASA() {
    const [CWASA, setCWASA] = useState<ICWASA>();

    useEffect(() => {
        const checkAndSet = () => {
            const _CWASA = (window as any).CWASA as ICWASA;
            if (!_CWASA && !CWASA) {
                setTimeout(checkAndSet, WAIT_TIME);
                return;
            }
            setCWASA(_CWASA);
        };
        checkAndSet();
    }, []);
    return CWASA;
}
