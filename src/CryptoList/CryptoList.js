import React, { Component } from 'react';
import CryptoCurrency from '../CryptoCurrency/CryptoCurrency'

class CryptoList extends Component
{
    deleteCrypto = (index, e) =>
    {
        const tmpCryptoData = Object.assign([], this.props.cryptoData)
        tmpCryptoData.splice(index, 1)
        this.props.setCryptoData(tmpCryptoData);
    }

    addCrypto = (event) =>
    {
        event.preventDefault()
        // if added crypto abbreviation already exists, remove it before adding (so someone really modifies it, instead of adding multiple times)
        const tmpCryptoData = this.props.cryptoData.filter(c => c.abbreviation !== event.target.abbreviation.value)
        tmpCryptoData.push(
            {
                name: event.target.name.value
                ,abbreviation: event.target.abbreviation.value
                ,img: event.target.img.value
                ,price: event.target.price.value
                ,lastDayDiff: event.target.lastDayDiff.value
                ,marketCap: event.target.marketCap.value
            })
            this.props.setCryptoData(tmpCryptoData);

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

    render()
    {
        
        let list = null;
        if (this.props.cryptoData)
        {
            list = this.props.cryptoData.map((cur,index) => <CryptoCurrency 
                key={cur.abbreviation}
                cryptoCurrency={cur}
                index={index+1}
                delEvent={this.deleteCrypto.bind(this, index)}
                history = {this.props.history}
                // moreInfo={this.props.moreInfo(this.props)}
            />)
        }

        const style = {
            marginLeft: "auto"
            ,marginRight:"auto"
        };

        return(
            <div className="CryptoList" >
                {!this.props.loading ? 
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
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}  
                        </tbody>                 
                    </table>
                 </div>
                 )
                : <h1>Data loading from API..</h1> }
            </div> 
        );
    }
}

export default CryptoList;