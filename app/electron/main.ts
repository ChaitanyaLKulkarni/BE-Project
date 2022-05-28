import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
// import installExtension, {
//     REACT_DEVELOPER_TOOLS,
// } from "electron-devtools-installer";
import stemAndGetSigml from "./sign";
import speechToTextStart from "./speechToText";

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // contextIsolation: false,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // win.loadURL("https://be-project-chi.vercel.app/avatar");
    // win.webContents.openDevTools();
    // return;
    if (app.isPackaged) {
        // 'build/index.html'
        win.loadFile(`${__dirname}/../index.html`);
        win.webContents.openDevTools();
    } else {
        win.loadURL("http://localhost:3000/index.html");

        win.webContents.openDevTools();

        // Hot Reloading on 'node_modules/.bin/electronPath'
        // require("electron-reload")(__dirname, {
        //     electron: path.join(
        //         __dirname,
        //         "..",
        //         "..",
        //         "node_modules",
        //         ".bin",
        //         "electron" + (process.platform === "win32" ? ".cmd" : "")
        //     ),
        //     forceHardReset: true,
        //     hardResetMethod: "exit",
        // });
    }
}

app.whenReady().then(() => {
    // DevTools
    // installExtension(REACT_DEVELOPER_TOOLS)
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log("An error occurred: ", err));

    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });
    speechToTextStart();
});

ipcMain.handle("engStem", (e, data) => {
    return stemAndGetSigml(data);
});
