import React, { useEffect, useCallback, useState } from 'react'

// import './CryptoCurrency.css'

function CryptoCurrencyDetails(props)
{
  const nomicsApiKey = "f1081ca11546b975db488be518d6045cd2bb35c9";
  let coin = props.match.params.key
  const [loading, setLoading] = useState(true)
  const [cryptoCurrency, setCryptoCurrency] = useState(null)

    const fetchAPI = async () =>
    {
      const apiDetailsUrl = `https://api.nomics.com/v1/currencies/ticker?key=${nomicsApiKey}&ids=${coin}&interval=1d`;
      try{
        const response = await fetch(apiDetailsUrl)
        const jsonResponse = await response.json()
        console.log("jsonRes:")
        console.log(jsonResponse)
        setLoading(false)
        setCryptoCurrency(jsonResponse)

      }
      catch(e)
      { 
        console.log(e)
      }
    }

    useEffect(() => 
    {
      fetchAPI()
    }, [])
    console.log(loading)
    console.log('Loading:')
console.log('cryptoCurrency:')
    console.log(cryptoCurrency)
    return (
      <div>
        {!loading ? 
        (<div>
          <p></p>
          <table>
              <thead>
                  <tr>
                      <th>Coin</th>
                      <th>Price</th>
                      <th>24h diff</th>
                      <th>Market Cap</th>
                      <th>Details</th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{cryptoCurrency.logo_url ? <img src={cryptoCurrency.logo_url} width="20" alt=""></img> : ''}{cryptoCurrency.symbol}</td>
                  <td>{parseFloat(cryptoCurrency.price).toLocaleString(undefined,{minimumFractionDigits:2})}$</td>
                  <td>{parseFloat(cryptoCurrency.lastDayDiff).toLocaleString(undefined,{minimumFractionDigits:2})}%</td>
                  <td>{parseFloat(cryptoCurrency.marketCap).toLocaleString()}$</td>
                </tr>
              </tbody>                 
          </table>
        </div>)
        : <h1>Data loading from API..</h1> }
      </div>
    

    )
}

export default CryptoCurrencyDetails