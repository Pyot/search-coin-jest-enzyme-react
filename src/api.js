import axios from 'axios';

const tickerUrl = 'https://api.coinpaprika.com/v1/ticker/'

export const coinApi = () => 
    new Promise(
        (resolve, reject) => {
            fetch(tickerUrl)
            .then(json => resolve(json.json()))
            .catch(error => alert(error))
        }
    )
