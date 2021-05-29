import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 
'react-router-dom'
import './index.css';

import App from './App';
import CryptoList from './CryptoList/CryptoList'
import CryptoCurrencyForm from './CryptoCurrencyForm/CryptoCurrencyForm'
import CryptoCurrencyNews from './CryptoCurrencyNews/CryptoCurrencyNews'
import NotFoundComponent from './NotFoundComponent/NotFoundComponent'

import registerServiceWorker from './registerServiceWorker';

const routing = (
    <Router>
        <div>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/addNewCrypto">Add new crypto</Link>
                </li>
                <li>
                <Link to="/news">News</Link>
                </li>
            </ul>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/addNewCrypto" component={CryptoCurrencyForm} />
                <Route path="/news" component={CryptoCurrencyNews} />
                <Route component={NotFoundComponent}/>
            </Switch>
        </div>
    </Router>
   )

ReactDOM.render(routing, document.getElementById('root'));

registerServiceWorker();
