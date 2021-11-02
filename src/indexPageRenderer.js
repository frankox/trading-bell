import {currentTargetState, TargetStates} from "./utils/targetStates.js";
import {tokensData} from "./utils/tokensData.js";
import {coinData} from "./utils/Apis.js";
import {creatNotification} from "./utils/notification.js";
import {epocsRemaining, rebase} from "./utils/rebase.js";

//region target price
const targetPriceInput = document.getElementById("target-price-input")
const currentTarget = () => {return Number(targetPriceInput.value)}
//endregion

//region current price
const price = document.getElementById('price')
let previousState = TargetStates.NONE

let currentData
let currentPrice
function getCurrentPrice() {
    coinData().then((response)=>{
        currentData = response.data
        currentPrice = currentData.wonderland.eur
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
    updateFields()
}
setInterval(updateFieldsAndSendNotifications, 3000) //every 3 secs
//endregion

//region value per staked token
const totalStakedInput = document.getElementById("total-staked")
const totalStaked = ()=>{return Number(totalStakedInput.value)}
const totalStakedValue = document.getElementById("total-staked-value")

const calculateValuePerToken = (tokens, value)=>{
    return currentData && totalStaked() !== 0 ? totalStaked() * currentData.wonderland.eur : "Loading..."
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
const daysRemainingToken = document.getElementById("days-remaining-token")

function updateDaysTokens(){
    daysTokens.innerText = Number(rebaseRateInput.value) > 0 && totalStaked() > 0 ?
        rebase(3*daysValue(), Number(rebaseRateInput.value), totalStaked()) : "Loading..."
}
function updateDaysMoneyValue(){
    daysMoneyValue.innerText = Number(rebaseRateInput.value) > 0 && totalStaked() > 0 ?
        daysTokens.innerText * currentPrice : "Loading..."
}
function updateDaysRemainingMoney(){
    daysRemainingMoney.innerText = targetValue() > 0 && totalStaked() > 0 &&  Number(rebaseRateInput.value) > 0  ?
        epocsRemaining(calculateValuePerToken(), targetValue(), Number(rebaseRateInput.value)): "Loading..."
}
function updateDaysRemainingToken(){
    daysRemainingToken.innerText = tokenTarget() > 0 && totalStaked() > 0 &&  Number(rebaseRateInput.value) > 0  ?
        epocsRemaining(calculateValuePerToken(), targetValue(), Number(rebaseRateInput.value)) : "Loading..."
}

function updateFields(){
    updateDaysTokens()
    updateDaysMoneyValue()
    updateDaysRemainingMoney()
    updateDaysRemainingToken()
}
//endregion