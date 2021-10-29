const {BrowserWindow, ipcRenderer}= require('electron')

//region set-up or update target price
/**
 * on click, the value in input is sent to main process, which dispatches it to whom needs it
 */
const updateBtn = document.getElementById("target-price-update-btn")

updateBtn.addEventListener('click',function(){
    ipcRenderer.send('update-target-value',
        args=>{
            args.returnValue = document.getElementById('target-price-input').value
        })

    console.log("diocane")
    //close window
    BrowserWindow.getFocusedWindow().close()
})
//endregion
