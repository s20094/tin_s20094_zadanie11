import React, { Component } from 'react';
import CryptoCurrency from '../CryptoCurrency/CryptoCurrency'

class CryptoList extends Component
{

    state = {
        cryptoData: [
            {
                name: 'Bitcoin'
                ,abbreviation: 'BTC'
                ,img: 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png'
                ,price: 50117.78
                ,lastDayDiff: 3.2
                ,marketCap: 934574691459
            }
            ,{
                name: 'Ethereum'
                ,abbreviation: 'ETH'
                ,img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/220px-Ethereum-icon-purple.svg.png'
                ,price: 1658.70
                ,lastDayDiff: -0.4
                ,marketCap: 190935815332
            }
            ,{
                name: 'Tether'
                ,abbreviation: 'USDT'
                ,img: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=010'
                ,price: 1.00
                ,lastDayDiff: 0.1
                ,marketCap: 36589369116
            }
            ,{
                name: 'Binance Coin'
                ,abbreviation: 'BNB'
                ,img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
                ,price: 234.10
                ,lastDayDiff: 4.0
                ,marketCap: 36252634249
            }
        ].sort((a,b) => b.marketCap - a.marketCap)
        ,submitEnabled: true

    }
   

    deleteCrypto = (index, e) =>
    {
        const tmpCryptoData = Object.assign([], this.state.cryptoData)
        tmpCryptoData.splice(index, 1)
        this.setState({cryptoData:tmpCryptoData})
    }

    addCrypto = (event) =>
    {
        event.preventDefault()
        // if added crypto abbreviation already exists, remove it before adding (so someone really modifies it, instead of adding multiple times)
        const tmpCryptoData = this.state.cryptoData.filter(c => c.abbreviation !== event.target.abbreviation.value)
        tmpCryptoData.push(
            {
                name: event.target.name.value
                ,abbreviation: event.target.abbreviation.value
                ,img: event.target.img.value
                ,price: event.target.price.value
                ,lastDayDiff: event.target.lastDayDiff.value
                ,marketCap: event.target.marketCap.value
            })
        this.setState({cryptoData:tmpCryptoData.sort((a,b) => b.marketCap - a.marketCap)})
    }

    validateAbbreviation = (event) =>
    {
        if(event.target.value.length < 3)
        {
            this.setState({submitEnabled:false})
            return false;
        }
        this.setState({submitEnabled:true})
        return true;

    }

    render()
    {
        const list = this.state.cryptoData.map((cur,index) => <CryptoCurrency key={cur.abbreviation} cryptoCurrency={cur} index={index+1} delEvent={this.deleteCrypto.bind(this, index)}/>)

        const style = {
            marginLeft: "auto"
            ,marginRight:"auto"
        };

        return(
            <div className="CryptoList" >
                <table style={style}>
                    <tbody>
                        {list}  
                    </tbody>                 
                </table>
                
                    <p><b>Add new Crypto</b></p>
                    <form onSubmit={this.addCrypto}>
                        <label>Name</label><br/>
                        <input placeholder="Cardano" type="text" name="name" defaultValue="Cardano" /><br/>
                        <label>Abbreviation </label><label style={{color: !this.state.submitEnabled ? 'red' :'black'}}>(longer than 2 characters)</label><br/>
                        <input placeholder="ADA" type="text" name="abbreviation" defaultValue="ADA" onChange={this.validateAbbreviation} /><br/>
                        <label>Price</label><br/>
                        <input placeholder="2,02" type="text" name="price" defaultValue="2.02"/><br/>
                        <label>LastDayDiff</label><br/>
                        <input placeholder="0,3" type="text" name="lastDayDiff" defaultValue="-5.4"/><br/>
                        <label>MarketCap</label><br/>
                        <input placeholder="64887369599" type="text" name="marketCap" defaultValue="34445" /><br/>
                        <label>ICON url </label><br/>
                        <input placeholder="https://assets.coingecko.com/coins/images/975/small/cardano.png" defaultValue="https://assets.coingecko.com/coins/images/975/small/cardano.png" type="text" name="img"/><br/>
                        <button disabled={!this.state.submitEnabled}>Add new Crypto</button>
                    </form>           
            </div>
        );
    }
}

export default CryptoList;