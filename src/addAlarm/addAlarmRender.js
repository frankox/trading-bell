const path = require('path')
const {BrowserWindow}= require('electron')
const thisWin = BrowserWindow.getFocusedWindow()
//region behaviours
//region updateBtn
const updateBtn = document.getElementById("updateBtn")
updateBtn.addEventListener('click',function(){
    thisWin.close()
})
//endregion
//endregion