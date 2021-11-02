const CoinGecko = require('coingecko-api')

//Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko()

// TODO: for call infos: https://github.com/miscavage/CoinGecko-API https://www.coingecko.com/en/api/documentation?
const ping = async() => {
    await CoinGeckoClient.ping()
}

export const coinData = async () => {
    return CoinGeckoClient.simple.price({
        ids: ['wonderland', 'olympus', 'klima-dao'],
        vs_currencies: ['eur', 'usd'],
    });
}