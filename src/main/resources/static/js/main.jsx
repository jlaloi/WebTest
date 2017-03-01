import 'babel-polyfill';
require('../index.html');
import css from '../styles/styles.css';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import Store from './store.jsx'

import Example from './component/Example.jsx'
import UserTab from './component/UserTab.jsx'
import FirstTab from './component/FirstTab.jsx'
import StoreComp from './component/StoreComp.jsx'
import Layout from './component/Layout.jsx'

const routes = (
    <Route component={Layout}>
        <Route path="/example/:pos" component={Example} />
        <Route path="/user" component={UserTab} />
        <Route path="/store" component={StoreComp} />
        <Route path="/" component={FirstTab} />
    </Route>
);

const main = () => {
    render(
        <Router history={hashHistory}>{routes}</Router>
        , document.getElementById('content')
    );
};

Store.subscribe(main);

main();