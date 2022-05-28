// Expose engStem from utils
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    engStem: (data: string): Promise<any> =>
        ipcRenderer.invoke("engStem", data),
    onTrascribe: (cb: (text: string) => void): any =>
        ipcRenderer.on("trascribe", (event, text) => {
            cb(text);
        }),
});
