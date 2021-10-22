const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.BrowserWindow

/**
 * here we say that onClick of the retrieved button we want to go to the add page
 * @type {HTMLElement}
 */
const notifyBtn = document.getElementById("notifyBtn")
notifyBtn.addEventListener('click',function(enevent){
    //region getting path
    const modalPath = path.join('file://', __dirname,'add.html')
    //endregion

    //region setting up browserwindow
    let win = new BrowserWindow({
        frame: false,

        alwaysOnTop: true,

        width: 400,

        height: 200,

        webPreferences: {

            nodeIntegration: true,

            contextIsolation: false,

            enableRemoteModule: true

        }

    })
    win.on("close", function (){win = null})
    //endregion

    //region load page
    win.loadURL(modalPath)
    //endregion

    //region show page
    win.show()
    //endregion
})