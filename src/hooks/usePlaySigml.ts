import { useEffect, useState } from "react";
import { ICWASA } from "../utils/CWASA";
import { ISignResponse } from "../utils/types";

export type Symbol = { symbol: string; idx: number };

export default function usePlaySigml(CWASA: ICWASA | undefined) {
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [symbols, setSymbols] = useState([] as Symbol[]);
    const [signId, seSignId] = useState(0);

    const requestAndPlaySiGML = async (inpText: string): Promise<void> => {
        if (!CWASA) return;
        setIsLoading(true);
        fetch(
            "/api/sign?" +
                new URLSearchParams({
                    q: inpText,
                }).toString()
        )
            .then((resp) => resp.json())
            .then((data: ISignResponse) => {
                if (data.status_code !== 200) return;
                let i = 0;
                const symbols: Symbol[] = [];
                data.data?.symbols.forEach((symbol) => {
                    for (let j = 0; j < symbol.length; j++) {
                        const sym = symbol[j];
                        symbols.push({ symbol: sym, idx: i++ });
                    }
                    symbols.push({ symbol: " ", idx: i + 0.1 });
                });
                setSymbols(symbols);
                CWASA?.playSiGMLText(data.data?.sigml ?? "");
            })
            .catch((err) => {
                window.alert("Something went wrong!...");
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const playSigmlText = (sigml: string): string | undefined => {
        if (!CWASA) return;
        return CWASA.playSiGMLText(sigml);
    };

    const stopPlaying = (): string | undefined => {
        if (!CWASA) return;
        return CWASA.stopSiGML();
    };

    useEffect(() => {
        CWASA?.addHook("animactive", () => setIsPlaying(true));
        CWASA?.addHook("animidle", () => setIsPlaying(false));
        CWASA?.addHook("avatarsign", (e) => {
            // {typ: "avatarsign", msg: {g: 'your', f: 1, s: 0}, av: 0}
            seSignId(e.msg.s);
        });
    }, [CWASA]);

    return {
        isLoading,
        isPlaying,
        symbols,
        signId,
        requestAndPlaySiGML,
        playSigmlText,
        stopPlaying,
    };
}
