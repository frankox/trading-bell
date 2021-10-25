const path = require('path')
const {BrowserWindow}= require('electron')
const thisWin = ()=>{ console.log(BrowserWindow.getFocusedWindow()); return BrowserWindow.getFocusedWindow()}

//region behaviours
//region button behaviours
/**
 * here we say that onClick of the retrieved button we want to go to the add page
 * @type {HTMLElement}
 */
const closeBtn = document.getElementById("updateBtn")
closeBtn.addEventListener('click',function(){
    console.log("aasasa",thisWin)
    thisWin.close()
})
//endregion
//endregion