import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, NavLink, BrowserRouter as Router, Switch } from 
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
                    <NavLink exact={true} activeClassName="active" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/addNewCrypto">Add new crypto</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/news">News</NavLink>
                </li>
            </ul>
            <Switch>
                <Route exact={true} path="/" component={CryptoList} />
                <Route path="/addNewCrypto" component={CryptoCurrencyForm} />
                <Route path="/news" component={CryptoCurrencyNews} />
                <Route component={NotFoundComponent}/>
            </Switch>
        </div>
    </Router>
   )

ReactDOM.render(routing, document.getElementById('root'));

registerServiceWorker();
