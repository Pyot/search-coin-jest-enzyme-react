import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinResult: ''
    };
  }

  componentDidMount() {
    const tickerUrl = 'https://api.coinpaprika.com/v1/ticker/'

    fetch(tickerUrl)
            .then(json => json.json())
            .then(coinData => {
      this.setState({
        coinData: coinData
      })
    }).catch(error => alert('There is some prolem with server ' + error))
  }

  getCoinName = (shortName) => {
    let { coinData } = this.state
    let findCoin = shortName.target.value
    if (findCoin.slice(0, 5) === 'Name/') {
      let coinObject = coinData.find(coin => coin.symbol === findCoin.slice(5));
      if (coinObject !== undefined) {
        if (coinObject.hasOwnProperty('name')) {
          this.setState({
            coinResult: coinObject.name
          })
        } else {
          alert('Missing name for the ' + findCoin.slice(5))
        }
      } else {
        this.setState({
          coinResult: ''
        })
      }
    } 
  }

  getCoinPrice = (shortName) => {
    let { coinData } = this.state
    let findCoin = shortName.target.value
    if (findCoin.slice(0, 6) === 'Price/') {
      let coinObject = coinData.find(coin => coin.symbol === findCoin.slice(6));
      if (coinObject !== undefined) {
        if (coinObject.hasOwnProperty('price_usd')) {
          this.setState({
            coinResult: coinObject.price_usd
          })
        } else {
          alert('Missing price for the ' + findCoin.slice(6))
        }
      } else {
        this.setState({
          coinResult: ''
        })
      }
    }
  }

  selectSearchType = (event) => {
    let findCoin = event.target.value;
    if (findCoin.slice(0, 5) === 'Name/') {
      this.getCoinName(event)
    } else if (findCoin.slice(0, 6) === 'Price/') {
      this.getCoinPrice(event)
    }
  }

  render() {
    return (
      <div>
        <input id={"input-fraze"} onChange={(event) => { this.selectSearchType(event) }} />
        <input id={"output-data"} value={this.state.coinResult} readOnly/>
      </div>
    );
  }
}

export default App;
