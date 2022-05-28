type Hook =
    | "avatarfps"
    | "avatarframe"
    | "avatarsign"
    | "avatarloaded"
    | "sigmlloading"
    | "sigmlloaded"
    | "animactive"
    | "animidle"
    | "status";

type EventCallback = (evt: { typ: Hook; msg: any; av: number }) => void;

export interface ICWASA {
    init: (config: any) => Promise<any>;
    playSiGMLURL: (url: string, av?: number) => string;
    playSiGMLText: (SIGMLText: string, av?: number) => string;
    stopSiGML: (av?: number) => string;
    addHook: (type: Hook, callback: EventCallback) => void;
}

// export const getCWASA = () => (window as any).CWASA as ICWASA;
