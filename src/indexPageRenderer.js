const axios = require("axios")
const CoinGecko = require('coingecko-api')

//region coinGecko api setup
//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko()

//3. Make calls ---> TODO: for call infos: https://github.com/miscavage/CoinGecko-API https://www.coingecko.com/en/api/documentation?
const ping = async() => {
    let data = await CoinGeckoClient.ping()
}
//endregion

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
const targetPriceInput = document.getElementById("target-price-input")
const currentTarget = () => {return Number(targetPriceInput.value)}
//endregion

//region current price
const price = document.getElementById('price')
//region notification
let previousState = TargetStates.NONE
const currentTargetState = (price, target) =>{
    return !target || target === 0 ?
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

let currentPrice
function getCurrentPriceAndSendNotification() {
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=OHM&tsyms=EUR')
        .then(response => {
            currentPrice = Number(response.data.EUR)
            price.innerText = currentPrice
        })

    const currentState = currentTargetState(price.innerText, currentTarget())
    if(currentState === TargetStates.NONE){
        previousState = currentState

    } else if (currentState && currentState !== previousState) {
        creatNotification(tokens.OHM, currentState)
        previousState = currentState
    }
}
//endregion

//region scheduler
function updateFieldsAndSendNotifications(){
    getCurrentPriceAndSendNotification()
    displayTotalStakedValue()
}
setInterval(updateFieldsAndSendNotifications, 3000) //every 3 secs
//endregion

//region value per staked token
const totalStakedInput = document.getElementById("total-staked")
const totalStaked = ()=>{return Number(totalStakedInput.value)}
const totalStakedValue = document.getElementById("total-staked-value")

function calculateValuePerToken(){
    return currentPrice && totalStaked() !== 0 ? totalStaked() * currentPrice : "Loading..."
}

function displayTotalStakedValue(){
    totalStakedValue.innerText = calculateValuePerToken()
}

totalStakedInput.addEventListener('change',function (){
    displayTotalStakedValue()
})
//endregion

