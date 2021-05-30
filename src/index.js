import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Link,
  NavLink,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import "./index.css";

import App from "./App";
import CryptoList from "./CryptoList/CryptoList";
import CryptoCurrencyForm from "./CryptoCurrencyForm/CryptoCurrencyForm";
import CryptoCurrencyDetails from "./CryptoCurrencyDetails/CryptoCurrencyDetails";
import NotFoundComponent from "./NotFoundComponent/NotFoundComponent";

import registerServiceWorker from "./registerServiceWorker";

class Routing extends React.Component {
  
  nomicsApiKey = "f1081ca11546b975db488be518d6045cd2bb35c9";

  state = {
    cryptoData: null,
    loading: true,
    errorFetchedChecker: false
  };

  setCryptoData = (data) =>
  {
    this.setState({ cryptoData: data.sort((a,b) => b.marketCap - a.marketCap) })
  }

  async componentDidMount() {
    const apiUrl = `https://api.nomics.com/v1/currencies/ticker?key=${this.nomicsApiKey}&ids=BTC,ETH,USDT,BNB,ATOM,1INCH&interval=1d`;
    try{
      const response = await fetch(apiUrl)
      if (response.status == 429)
      {
        // setErrorFetchedChecker(c => !c)
        // this.setState({errorFetchedChecker: !this.errorFetchedChecker})
        console.log('rerun')
        this.setState({})
        return this.componentDidMount()
      }
      else
      {
        const jsonResponse = await response.json()
        const tmpCryptoData = [];
        jsonResponse.forEach((c) => {
          tmpCryptoData.push({
            name: c.name,
            abbreviation: c.symbol,
            img: c.logo_url,
            price: c.price,
            lastDayDiff: c["1d"].price_change_pct * 100,
            marketCap: c.market_cap,
          });
        });
        this.setState(
          {
            loading: false
            ,cryptoData: tmpCryptoData
          })
      }

    }
    catch(e)
    { 
      console.log(e)
    }
    }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <NavLink exact={true} activeClassName='active' to='/'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active' to='/addNewCrypto'>
                Add new crypto
              </NavLink>
            </li>
          </ul>
          <Switch>
            <Route exact={true} path='/'>
              <CryptoList
                cryptoData={this.state.cryptoData}
                setCryptoData={this.setCryptoData}
                loading={this.state.loading}
              />
            </Route>
            <Route path='/addNewCrypto'>
              <CryptoCurrencyForm
                setCryptoData={this.setCryptoData}
                cryptoData={this.state.cryptoData}
              />
            </Route>
            <Route path='/CryptoCurrencyDetails/:key' component={CryptoCurrencyDetails} />
            <Route component={NotFoundComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Routing />, document.getElementById("root"));

registerServiceWorker();
