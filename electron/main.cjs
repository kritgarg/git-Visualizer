const { app, BrowserWindow , dialog ,ipcMain } = require('electron')

const fs = require("fs");
const path = require('path')
const {execSync} = require('child_process')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.handle("select-folder" ,async() => {
  const result = await dialog.showOpenDialog({
    properties:["openDirectory"]
  })

  if(result.canceled){
    return null
  }

  const selectedpath = result.filePaths[0];

  const gitpath = path.join(selectedpath,".git");

  const isGitrepo = fs.existsSync(gitpath)

  let commits =[]

  if(isGitrepo){
    const log = execSync(`git -C "${selectedpath}" log --all --pretty=format:"%H|%P|%an|%ad|%s|%N" --date=iso`).toString();
    return {
      path:selectedpath,
      isGitrepo,
      log
    }
  }



})