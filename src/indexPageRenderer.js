const axios = require("axios")
const CoinGecko = require('coingecko-api')

//region api calls
//Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko()

// TODO: for call infos: https://github.com/miscavage/CoinGecko-API https://www.coingecko.com/en/api/documentation?
const ping = async() => {
    await CoinGeckoClient.ping()
}

const coinData = async()=> {
    return CoinGeckoClient.simple.price({
        ids: ['wonderland', 'olympus', 'klima-dao'],
        vs_currencies: ['eur', 'usd'],
    });
}

//endregion

//region enums
const TargetStates = {
    ABOVE: 'above',
    BELOW: 'below',
    NONE: 'none'
}

const tokensData = {
    TIME: {
        SYMBOL: 'TIME',
        API_VERSION: 'wonderland'
    },
    OHM: {
        SYMBOL: 'OHM',
        API_VERSION: 'olympus'
    },
    KLIMA:{
        SYMBOL: 'KLIMA',
        API_VERSION: 'klima-dao'
    },
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

let currentData
let currentPrice
function getCurrentPrice() {
    coinData().then((response)=>{
        currentData = response.data
        currentPrice = currentData.wonderland.usd
        price.innerText = currentPrice
    })

}
//endregion
//region notification
function sendNotifications(){
    const currentState = currentTargetState(currentPrice, currentTarget())
    if(currentState === TargetStates.NONE){
        previousState = currentState

    } else if (currentState && currentState !== previousState) {
        creatNotification(tokensData.OHM, currentState)
        previousState = currentState
    }
}
// endregion

//region scheduler
function updateFieldsAndSendNotifications(){
    getCurrentPrice()
    sendNotifications()
    displayTotalStakedValue()
}
setInterval(updateFieldsAndSendNotifications, 3000) //every 3 secs
//endregion

//region value per staked token
const totalStakedInput = document.getElementById("total-staked")
const totalStaked = ()=>{return Number(totalStakedInput.value)}
const totalStakedValue = document.getElementById("total-staked-value")

const calculateValuePerToken = ()=>{
    return currentData && totalStaked() !== 0 ? totalStaked() * currentData : "Loading..."
}

const displayTotalStakedValue = ()=>{
    totalStakedValue.innerText = calculateValuePerToken()
}

totalStakedInput.addEventListener('change',function (){
    displayTotalStakedValue()
})
//endregion

//region rebaseRate
const rebaseRateInput = document.getElementById("rebase-rate-input")
const rebaseValue = (epocs, value)=>{
    return epocs >= 1 ?
    rebaseValue(epocs-1, value+ value*rebaseRateInput.value/100) :
        value
}

const epocsRemainingCount = (start, end, count)=> {
    return start >= end ?
        count + epocsRemaining(start+ start*rebaseRateInput.value/100, end)  :
        count
}

const epocsRemaining = (start, end) => {
    return epocsRemainingCount(start, end, 0)
}

const rebaseRate = document.getElementById("rebase-rate")
rebaseRateInput.addEventListener('change',function (){
    rebaseRate.innerText = rebaseRateInput.value+"%"

})
//endregion

//region updateFields
const daysValueInput = document.getElementById("days-value")
const daysValue = ()=>{return Number(daysValueInput.value)}
daysValueInput.addEventListener('change',function (){
    updateDaysTokens()
    updateDaysMoneyValue()
})

const targetValueInput = document.getElementById("target-value")
const targetValue = ()=>{return Number(targetValueInput.value)}
targetValueInput.addEventListener('change',function (){
    updateDaysRemainingMoney()
})

const tokenTargetInput = document.getElementById("token-target")
const tokenTarget = ()=>{return Number(tokenTargetInput.value)}
targetValueInput.addEventListener('change',function (){
    updateDaysRemainingToken()
})

const daysTokens = document.getElementById("days-token-value")
const daysMoneyValue = document.getElementById("days-money-value")
const daysRemainingMoney = document.getElementById("days-remaining-value")
const daysRemainingToken = document.getElementById("days-remaining-value")

function updateDaysTokens(){
    daysTokens.innerText = Number(rebaseRateInput.value) > 0 && totalStaked() > 0 ?
        rebaseValue(3*daysValue(), totalStaked()) : "Loading..."
}
function updateDaysMoneyValue(){
    daysMoneyValue.innerText = Number(rebaseRateInput.value) > 0 && totalStaked() > 0 ?
        rebaseValue(3*daysValue(), currentPrice) : "Loading..."
}
function updateDaysRemainingMoney(){
    daysRemainingMoney.innerText = targetValue() > 0 && totalStaked() > 0 &&  Number(rebaseRateInput.value) > 0  ?
        epocsRemaining(calculateValuePerToken(), targetValue()) : "Loading..."
}
function updateDaysRemainingToken(){
    daysRemainingToken.innerText = tokenTarget() > 0 && totalStaked() > 0 &&  Number(rebaseRateInput.value) > 0  ?
        epocsRemaining(calculateValuePerToken(), targetValue()) : "Loading..."
}

function updateFields(){
    updateDaysTokens()
    updateDaysMoneyValue()
    updateDaysRemainingMoney()
    updateDaysRemainingToken()
}
//endregion