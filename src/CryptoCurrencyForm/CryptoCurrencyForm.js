import React from 'react';
import { withRouter } from 'react-router-dom'    


class CryptoCurrencyForm extends React.Component {
    
    state = 
    {
        submitEnabled: true
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
  
    addCrypto = (event) =>
    {
        event.preventDefault()
        const {  history } = this.props
        console.log(this.props)

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
            history.push('/')
    }

    render() {
        const style = {
            marginLeft: "auto"
            ,marginRight:"auto"
        };
    
        return(
        <div style={style}>
            <p><b>Add new Crypto</b></p>
            <form style={style} onSubmit={this.addCrypto}>
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
    )
  }
}
export default withRouter(CryptoCurrencyForm)