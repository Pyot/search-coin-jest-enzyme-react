
const tickerUrl = 'https://api.coinpaprika.com/v1/ticker/'

export const coinApi = () => 
    new Promise(
        (resolve, reject) => {
            fetch(tickerUrl)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => alert(error))
        }
    )
