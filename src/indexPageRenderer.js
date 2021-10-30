const {ipcRenderer, BrowserWindow} = require('electron')
const path = require('path')
const axios = require("axios")

//region enums
const targetStates = {
    ABOVE: "above",
    BELOW: "below",
    NONE: "none"
}
const tokens = {
    TIME: "TIME",
    OHM: "OHM",
    KLIMA: "klima"
}
//endregion

//region target price
const targetPrice = document.getElementById('target-price')
const targetPriceInput = document.getElementById("target-price-input")
const updateAlarmBtn = document.getElementById("update-alarm-update-btn")
const targetValue = ()=>{ return Number(targetPriceInput.value)}
updateAlarmBtn.addEventListener('click',function() {
    targetPrice.innerText = 'Current Target: $'+targetValue().toLocaleString('en')
})
//endregion

//region current price
const price = document.getElementById('price')
//region notification
const currentTargetState = (price, target) =>{
    return target === 0 ?
        targetStates.NONE :
        target > price ?
            targetStates.ABOVE :
            targetStates.BELOW
}

const notificationText = (token, currentTargetState) =>{
    return {
        title: token + " Alert",
        body: token +" has gone " + currentTargetState + " your target price!"
    }
}
function creatNotification(tokenName, currentTargetState){
    const notificationOptions = notificationText(tokenName, currentTargetState)
    return new window.Notification(notificationOptions.title, notificationOptions)
}

//endregion


function getCurrentPrice() {
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=OHM&tsyms=EUR')
        .then(response => {
            const cryptos = response.data
            price.innerText = cryptos.EUR
        })

    const currentState = currentTargetState(price.innerText, targetValue())
    if (currentState && currentState !== targetStates.NONE) {
        creatNotification(tokens.OHM, currentState)
    }
}
//endregion

//region scheduler
getCurrentPrice()
setInterval(getCurrentPrice, 30000) //every 30 secs
//endregion



//for now we'll use only main window
/*//region notify
/!**
 * here we say that onClick of the retrieved button we want to go to the add page
 * @type {HTMLElement}
 *!/
const updateAlarmBtn = document.getElementById("updateAlarmBtn")
updateAlarmBtn.addEventListener('click',function(){
    const modalPath = path.join('file://', __dirname,'/addAlarm/addAlarm.html')
    window.open(modalPath, 'modal');
})
//endregion*/



