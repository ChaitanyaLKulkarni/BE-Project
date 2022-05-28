import { useCallback, useEffect, useState } from "react";
import { ICWASA } from "../types/CWASA";

export type Symbol = { symbol: string; idx: number };
type SymbolswSigml = { symbols: Symbol[]; sigml: string };

interface MyWindow extends Window {
    api: {
        engStem: (
            data: string
        ) => Promise<{ symbols: string[][]; sigml: string }>;
    };
}

export default function usePlaySigml(CWASA: ICWASA | undefined) {
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [symbols, setSymbols] = useState([] as Symbol[]);
    const [signId, setSignId] = useState(0);

    const [queue, setQueue] = useState([] as SymbolswSigml[]);

    const requestAndPlaySiGML = useCallback(
        async (inpText: string): Promise<void> => {
            console.log("Called");
            if (!CWASA) return;
            setIsLoading(true);
            (window as any as MyWindow).api
                .engStem(inpText)
                .then((data) => {
                    let i = 0;
                    const symbols: Symbol[] = [];
                    data.symbols.forEach((symbol) => {
                        for (let j = 0; j < symbol.length; j++) {
                            const sym = symbol[j];
                            symbols.push({ symbol: sym, idx: i++ });
                        }
                        symbols.push({ symbol: " ", idx: i + 0.1 });
                    });
                    setQueue((prevQueue) => [
                        ...prevQueue,
                        { symbols, sigml: data.sigml },
                    ]);
                })
                .catch((err) => {
                    window.alert("Something went wrong!...");
                    console.error(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [CWASA]
    );

    useEffect(() => {
        if (!isPlaying && queue.length > 0) {
            const current = queue[0];
            setSymbols(current.symbols);
            CWASA?.playSiGMLText(current.sigml);
            setQueue([...queue.slice(1)]);
        }
    }, [CWASA, queue, isPlaying]);

    const playSigmlText = useCallback(
        (sigml: string): string | undefined => {
            if (!CWASA) return;
            console.log("Playing sigml text");
            return CWASA.playSiGMLText(sigml);
        },
        [CWASA]
    );

    const stopPlaying = useCallback((): string | undefined => {
        if (!CWASA) return;
        return CWASA.stopSiGML();
    }, [CWASA]);

    useEffect(() => {
        CWASA?.addHook("animactive", () => setIsPlaying(true));
        CWASA?.addHook("animidle", () => setIsPlaying(false));
        CWASA?.addHook("avatarsign", (e) => {
            // {typ: "avatarsign", msg: {g: 'your', f: 1, s: 0}, av: 0}
            setSignId(e.msg.s);
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
