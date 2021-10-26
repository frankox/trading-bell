import {CRYPTOCOMPARE_READONLY_APIKEY} from '/src/utils/configs.local'
const path = require('path')
const axios = require("axios")

//region behaviours

//region price
//region html components retrieval
const price = document.getElementById('price')
const targetPrice = document.getElementById('target-price')
//endregion

//region getCurrentPrice
//region mainFunction
function getCurrentPrice(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key='+CRYPTOCOMPARE_READONLY_APIKEY)
        .then(response =>{
            const cryptos = response.data
            console.log(cryptos)
        })
}
//endregion
getCurrentPrice()
setInterval(getCurrentPrice, 30000) //every 30 secs
//region scheduler

//endregion

//endregion
//endregion

//region closeBtn
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