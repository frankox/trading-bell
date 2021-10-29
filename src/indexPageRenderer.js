const {ipcRenderer, BrowserWindow} = require('electron')
const path = require('path')
const axios = require("axios")

//region behaviours

//region current price
const price = document.getElementById('price')
function getCurrentPrice(){
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=OHM&tsyms=EUR')
        .then(response =>{
            const cryptos = response.data
            price.innerText = cryptos.EUR
        })
}
//region scheduler
getCurrentPrice()
setInterval(getCurrentPrice, 30000) //every 30 secs
//endregion
//endregion

//region target price
const targetPrice = document.getElementById('target-price')
const targetPriceInput = document.getElementById("target-price-input")
const updateAlarmBtn = document.getElementById("update-alarm-update-btn")
updateAlarmBtn.addEventListener('click',function() {
    targetPrice.innerText = 'Current Target: $'+Number(targetPriceInput.value).toLocaleString('en')
})
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
//endregion

