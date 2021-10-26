// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, shell } = require('electron')
const path = require('path')

function createWindow () {
    // region Create the main browser window.
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('src/index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()


    /**
     * this is a menu object in which we define the menus and submenus present in the main page
     * @type {Electron.Menu}
     * the template is an array, meaning it is possible to create multiple menus having multiple submenus each
     */
    const menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            /**
             * those are the links to other pages, the main page is the current, by defining subItems
             * we can put actions and references on subItem interaction
             */
            submenu: [
                {label: 'adjust notification value'},
                {
                    label: 'CoinMarketCap',
                    click() {
                        /**
                         * in this case we open an external link, it is based on promise, so we can specify what to do
                         * next with the use of .then
                         */
                        shell.openExternal('http://coinMarketCap.com').then(r => {
                        })
                    }
                },
                {
                    label: 'exit',
                    /**
                     * here we define an action based on click event, click() is a function of MenuItemConstructionOptions
                     * that is abstract and optional, so we must implement what to do on click
                     */
                    click() {
                        app.exit()// in this case we need to quit application on exit
                    }
                },

            ]
        },
        {
            /**
             * for now it is empty, and is used just as an example of a multimenu
             */
            label: 'info'
        }
    ]);

    Menu.setApplicationMenu(menu)
    //endregion

    //region handle secondary windows
    mainWindow.webContents.setWindowOpenHandler(({url}) => {
        //it is possible to diversify the returned window options based on input path or other params
        switch (url){
            default: return {
                action: 'allow',
                overrideBrowserWindowOptions: {
                    width:400,
                    height: 200,
                    transparent: true,
                    modal: true,
                    parent: mainWindow,
                    fullscreenable: false,
                    backgroundColor: 'black',
                    webPreferences: {
                        nodeIntegration: true
                    }
                   /* webPreferences: {
                        preload: 'child-window-preload-script.js'
                    }*/
                }
            }
        }
    })
    //endregion
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.