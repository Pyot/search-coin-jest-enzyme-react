import React from 'react';
import logo from './logo.svg';
import './App.css';


import { coinApi } from './api.js'

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
      }).catch(error => alert('Error api fetch' + error))
    })
  }

  getCoinName = (shortName) => {
    let { coinData } = this.state
    let findCoin = shortName.target.value
    if (findCoin.slice(0, 4) === 'Name') {
      //The "if" statment could be remove after we are using selectSearchType() method.
      //It's been kept for usage the method withoud selectSearchType()
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
    if (findCoin.slice(0, 5) === 'Price') {
      //The "if" statment could be remove after we are using selectSearchType() function.
      //It's been kept for usage the method withoud selectSearchType()
      let coinObject = coinData.find(coin => coin.symbol === findCoin.slice(6));
      if (coinObject !== undefined) {
        if (coinObject.hasOwnProperty('price_usd')) {
          this.setState({
            coinResult: coinObject.price_usd
          })
        } else {
          alert('Missing price for the ' + findCoin.slice(5))
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
    if (findCoin.slice(0, 4) === 'Name') {
      this.getCoinName(event)
    } else if (findCoin.slice(0, 5) === 'Price') {
      this.getCoinPrice(event)
    }
  }

  render() {
    return (
      <div>
        <input id={"input-fraze"} onChange={(event) => { this.selectSearchType(event) }} />
        <input id={"output-data"} value={this.state.coinResult} readOnly/>
        {/* <button onClick={() => { this.getCoinName('BTC') }}>Test</button> */}
      </div>
    );
  }
}

export default App;
