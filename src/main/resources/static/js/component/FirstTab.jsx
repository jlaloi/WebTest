import React from 'react';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';
const local = require('./../locales.jsx');

const FirstTab = React.createClass({
    getInitialState() {
        return { name: 'Julien' };
    },
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    },
    handleChange: function (e) {
        counterpart.setLocale(e.target.value);
    },
    render() {
        return (
            <div>
                <h1>First Tab</h1>
                <p><Translate content="firstTab.hi" /> {this.state.name}</p>
                <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                <select defaultValue={counterpart.getLocale()} onChange={this.handleChange}>
                    <option>fr</option>
                    <option>en</option>
                </select>
            </div>
        );
    }
});

export default FirstTab;
