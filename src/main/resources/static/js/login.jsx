import 'babel-polyfill';
require('../login.html');
import css from '../styles/styles.css';
import Translate from 'react-translate-component'
import counterpart from 'counterpart';
import React from 'react';
import { render } from 'react-dom'

const local = require('./locales.jsx');

const Login = () => (
    <div>
        <Translate component="h2" content="login.title" />
        <form method="POST" action="/login.html">
            <Translate component="input" type="text" name="username" autoFocus attributes={{ placeholder: 'login.username' }} />
            <Translate component="input" type="password" name="password" attributes={{ placeholder: 'login.password' }} />
            <Translate component="input" type="submit" attributes={{ value: 'login.login' }} />
        </form>
    </div>
);

render(<Login></Login>, document.getElementById('content'));