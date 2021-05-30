import React, { useEffect, useCallback, useState } from 'react'

// import './CryptoCurrency.css'

function CryptoCurrencyDetails(props)
{
  const nomicsApiKey = "f1081ca11546b975db488be518d6045cd2bb35c9";
  let coin = props.match.params.key
  const [loading, setLoading] = useState(true)
  const [coinNotExists, setCoinNotExists] = useState(false)
  const [errorFetchedChecker, setErrorFetchedChecker] = useState(false);
  const [cryptoCurrency, setCryptoCurrency] = useState(null)
  

    const fetchAPI = async () =>
    {
      const apiDetailsUrl = `https://api.nomics.com/v1/currencies/ticker?key=${nomicsApiKey}&ids=${coin}&interval=1d`;
      try{
        const response = await fetch(apiDetailsUrl)
        // workaround to run useEffect again, if API was blocked by too many requests
        if (response.status == 429)
        {
          setErrorFetchedChecker(c => !c)
        }
        else
        {
          const jsonResponse = await response.json()
          console.log(jsonResponse[0])

          if (jsonResponse.length == 0)
          {
            setCoinNotExists(true)
            setLoading(false)
          }
          else
          {         
            setCryptoCurrency(jsonResponse[0])
            setLoading(false)
          }
        }
      }
      catch(e)
      { 
        console.log(e)
      }
    }

    useEffect(() => 
    {
      fetchAPI()
    }, [errorFetchedChecker])

    return (
      <div>
        {(() => {
          if (loading)
          {
            return <h1>Data loading from API..</h1>
          }
          else
          { 
            if(coinNotExists)
            {
              return <h1>Coin {coin} does not exist.</h1>
            }
            else
            {
              return <table>
                    <tbody>
                    <tr>
                      <th>Data time</th>
                      <td>{cryptoCurrency.price_timestamp}</td>
                    </tr>
                    <tr>
                        <th>Symbol</th>
                        <td>{cryptoCurrency.symbol}</td>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td>{cryptoCurrency.name}</td>
                    </tr>
                    <tr>
                      <th>Icon</th>
                      <td><img src={cryptoCurrency.logo_url} width="20"></img></td>
                    </tr>
                    <tr>
                      <th>Price</th>
                      <td>{parseFloat(cryptoCurrency.price).toLocaleString(undefined,{minimumFractionDigits:2})}$</td>
                    </tr>
                    <tr>
                      <th>ATH Price</th>
                      <td>{parseFloat(cryptoCurrency.high).toLocaleString(undefined,{minimumFractionDigits:2})}$</td>
                    </tr>
                    <tr>
                      <th>ATH date</th>
                      <td>{cryptoCurrency.high_timestamp}</td>
                    </tr>
                    <tr>
                      <th>Market cap</th>
                      <td>{parseFloat(cryptoCurrency.market_cap).toLocaleString()}$</td>
                    </tr>

                    <tr>
                      <th>Market cap position</th>
                      <td>{cryptoCurrency.rank}</td>
                    </tr>
                    </tbody>
              </table>
            }
          }
        })()
      }
      </div>
    )
}

export default CryptoCurrencyDetails