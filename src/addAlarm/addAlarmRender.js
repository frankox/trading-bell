const path = require('path')
const {BrowserWindow}= require('electron')
const thisWin = ()=>{ console.log(BrowserWindow.getFocusedWindow()); return BrowserWindow.getFocusedWindow()}

//region behaviours
//region close window

document.addEventListener('', function(){

})
/**
 * here we say that onClick of the retrieved button we want to go to the add page
 * @type {HTMLElement}
 */
const closeBtn = document.getElementById("closeBtn")
closeBtn.addEventListener('click',function(){
    console.log("aasasa",thisWin)
    thisWin.close()
})
//endregion
//endregion