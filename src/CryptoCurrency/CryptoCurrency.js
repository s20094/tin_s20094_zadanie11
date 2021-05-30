import React from 'react';
import { Link } from 'react-router-dom'    

import './CryptoCurrency.css'

function CryptoCurrency({cryptoCurrency, index, delEvent, history})
{
    // const {  history } = this.props
    // const moreInfo = () => {}
    const moreInfo = () => {history.push('/')}

    let CssClassName = cryptoCurrency.lastDayDiff > 0 ? 'up_24h' : 'down_24h'
    return (
        <tr className={CssClassName}>
            <td>{index}</td>
            <td>{cryptoCurrency.img ? <img src={cryptoCurrency.img} width="20" alt=""></img> : ''}{cryptoCurrency.abbreviation}</td>
            <td>{parseFloat(cryptoCurrency.price).toLocaleString(undefined,{minimumFractionDigits:2})}$</td>
            <td>{parseFloat(cryptoCurrency.lastDayDiff).toLocaleString(undefined,{minimumFractionDigits:2})}%</td>
            <td>{parseFloat(cryptoCurrency.marketCap).toLocaleString()}$</td>
            <td><Link to={`/CryptoCurrencyDetails/${cryptoCurrency.abbreviation}`}><button>More info</button></Link></td>
            <td><button onClick={delEvent}>Delete</button></td>
        </tr>
    )
}

export default CryptoCurrency

