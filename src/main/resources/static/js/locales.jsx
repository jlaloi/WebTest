import counterpart from 'counterpart';

const fr = require('./../languages/fr.jsx');
const en = require('./../languages/en.jsx');

const defaultLocale = 'fr';
const availableLocale = ['fr', 'en'];

var locale = defaultLocale;
const userLocale = window.navigator.userLanguage || window.navigator.language;
for (var e of availableLocale) {
    if (e === userLocale.slice(0, 2)) {
        locale = e;
        break;
    }
}

counterpart.setLocale(locale);
