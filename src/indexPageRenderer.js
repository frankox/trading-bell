const axios = require("axios")

//region enums
const TargetStates = {
    ABOVE: "above",
    BELOW: "below",
    NONE: "none"
}
const tokens = {
    TIME: "TIME",
    OHM: "OHM",
    KLIMA: "KLIMA"
}
//endregion

//region target price
const targetPrice = document.getElementById('target-price')
const targetPriceInput = document.getElementById("target-price-input")
const updateAlarmBtn = document.getElementById("update-alarm-update-btn")
const targetValue = ()=>{ return Number(targetPriceInput.value)}
let currentTarget = targetValue()
updateAlarmBtn.addEventListener('click',function() {
    targetPrice.innerText = 'Current Target: €'+targetValue().toLocaleString('en')
    currentTarget = targetValue()
})
//endregion

//region current price
const price = document.getElementById('price')
//region notification
let previousState = TargetStates.NONE
const currentTargetState = (price, target) =>{
    return target === 0 ?
        TargetStates.NONE :
        target < price ?
            TargetStates.ABOVE :
            TargetStates.BELOW
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
function getCurrentPriceAndSendNotification() {
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=OHM&tsyms=EUR')
        .then(response => {
            const cryptos = response.data
            price.innerText = cryptos.EUR
        })

    console.log(targetValue())
    const currentState = currentTargetState(price.innerText, targetValue())
    if (currentState && currentState !== previousState) {
        creatNotification(tokens.OHM, currentState)
        previousState = currentState
    }
}
//endregion

//region scheduler
getCurrentPriceAndSendNotification()
setInterval(getCurrentPriceAndSendNotification, 3000) //every 30 secs
//endregion



