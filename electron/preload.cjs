const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    test: () => "krit tested",
    selectFolder :() => ipcRenderer.invoke("select-folder"),
});