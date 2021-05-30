import React, { Component } from 'react';
import CryptoCurrency from '../CryptoCurrency/CryptoCurrency'

class CryptoList extends Component
{

    nomicsApiKey = 'f1081ca11546b975db488be518d6045cd2bb35c9'

    state = {
        cryptoData:null
        ,loading: true
        // ,submitEnabled: true
    }
   

    deleteCrypto = (index, e) =>
    {
        const tmpCryptoData = Object.assign([], this.state.cryptoData)
        tmpCryptoData.splice(index, 1)
        this.setState({cryptoData:tmpCryptoData})
        console.log(this.state.cryptoData)
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
        // as I am using suggested mocked free API service, so below method has no real effect serverside
        fetch('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST'
            ,body: JSON.stringify(
                {
                    name: event.target.name.value
                    ,abbreviation: event.target.abbreviation.value
                    ,price: event.target.price.value
                    ,lastDayDiff: event.target.lastDayDiff.value
                    ,marketCap: event.target.marketCap.value
                })
                ,headers:
                {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
        }).catch(error => console.log(error))

    }

    // validateAbbreviation = (event) =>
    // {
    //     if(event.target.value.length < 3)
    //     {
    //         this.setState({submitEnabled:false})
    //         return false;
    //     }
    //     this.setState({submitEnabled:true})
    //     return true;

    // }

    async componentDidMount()
    {
        const apiUrl = `https://api.nomics.com/v1/currencies/ticker?key=${this.nomicsApiKey}&ids=BTC,ETH,USDT,BNB,ATOM,1INCH&interval=1d`
        const response = await fetch(apiUrl).catch(error => console.log(error))
        if(response)
        {
            const jsonResponse = await response.json().catch(error => console.log(error))
            const tmpCryptoData = []
            jsonResponse.forEach(c => {
                tmpCryptoData.push(
                    {
                    name: c.name
                    ,abbreviation: c.symbol
                    ,img: c.logo_url
                    ,price: c.price
                    ,lastDayDiff:  c["1d"].price_change_pct * 100
                    ,marketCap: c.market_cap
                    }
                )
            });
            this.setState(
                {
                    cryptoData:tmpCryptoData.sort((a,b) => b.marketCap - a.marketCap)
                    ,loading:false
                })
                console.log(this.state.cryptoData)

        }
        // else
        // {
        //     setInterval(() => 
        //     {
        //         this.setState({})
        //     }, 4000)
        // }
    }

    render()
    {
        
        let list = null;
        if (this.state.cryptoData)
        {
            list = this.state.cryptoData.map((cur,index) => <CryptoCurrency key={cur.abbreviation} cryptoCurrency={cur} index={index+1} delEvent={this.deleteCrypto.bind(this, index)}/>)
        }

        const style = {
            marginLeft: "auto"
            ,marginRight:"auto"
        };

        return(
            <div className="CryptoList" >
                {!this.state.loading ? 
                (<div>
                    <a href="https://nomics.com" target="_blank">Crypto Market Cap &amp; Pricing Data Provided By
                                Nomics</a>
                    <table style={style}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Coin</th>
                                <th>Price</th>
                                <th>24h diff</th>
                                <th>Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}  
                        </tbody>                 
                    </table>
                 </div>
                 )
                : <h2>Data loading from API..</h2> }
                {/* <div>
                    <a href="https://nomics.com" target="_blank">Crypto Market Cap &amp; Pricing Data Provided By
                                Nomics</a>
                    <table style={style}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Coin</th>
                                <th>Price</th>
                                <th>24h diff</th>
                                <th>Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}  
                        </tbody>                 
                    </table>
                </div>*/}
            </div> 
        );
    }
}

export default CryptoList;