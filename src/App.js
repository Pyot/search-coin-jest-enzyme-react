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
    coinApi().then(coinData => {
      console.log('coinData gg14', coinData)
      this.setState({
        coinData
      })
    })
  }

  getCoinName = (shortName) => {
    console.log(shortName.target.value.slice(0, 4))
    let { coinData } = this.state
    let findCoin = shortName.target.value
    console.log("TCL: App -> getCoinName -> findCoin", findCoin)
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
    console.log(shortName.target.value.slice(0, 5))
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
        <input id={"output-data"} defaultValue={this.state.coinResult} />
        {/* <button onClick={() => { this.getCoinName('BTC') }}>Test</button> */}
      </div>
    );
  }
}

export default App;
