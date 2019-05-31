import axios from 'axios';

const tickerUrl = 'https://api.coinpaprika.com/v1/ticker/'

export const coinApi = () => 
    new Promise(
        (resolve, reject) => {
            axios.get(tickerUrl)
            .then(json => resolve(json.data))
            .catch(error => alert(error))
        }
    )
