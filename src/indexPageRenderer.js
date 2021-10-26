const path = require('path')

//region behaviours
//region open AddAlarm window
/**
 * here we say that onClick of the retrieved button we want to go to the add page
 * @type {HTMLElement}
 */
const notifyBtn = document.getElementById("notifyBtn")
notifyBtn.addEventListener('click',function(){
    const modalPath = path.join('file://', __dirname,'/addAlarm/addAlarm.html')
    window.open(modalPath, 'modal')
})
//endregion
//endregion