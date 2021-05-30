import React from 'react';

import './CryptoCurrency.css'

function CryptoCurrency({cryptoCurrency, index, delEvent})
{
    let CssClassName = cryptoCurrency.lastDayDiff > 0 ? 'up_24h' : 'down_24h'
    return (
        <tr className={CssClassName}>
            <td>{index}</td>
            <td>{cryptoCurrency.img ? <img src={cryptoCurrency.img} width="20" alt=""></img> : ''}{cryptoCurrency.abbreviation}</td>
            <td>{parseFloat(cryptoCurrency.price).toLocaleString(undefined,{minimumFractionDigits:2})}$</td>
            <td>{parseFloat(cryptoCurrency.lastDayDiff).toLocaleString(undefined,{minimumFractionDigits:2})}%</td>
            <td>{parseFloat(cryptoCurrency.marketCap).toLocaleString()}$</td>
            <td><button onClick={delEvent}>Delete</button></td>
        </tr>
    )
}

export default CryptoCurrency

