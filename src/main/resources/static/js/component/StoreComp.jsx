import React from 'react';
import { render } from 'react-dom';
import Store from './../store.jsx';

const StoreDisplay = (props) => (
    <div>
        <h1>{props.value}</h1>
        <button onClick={props.onIncrement}>+</button>
        <button onClick={props.onDecrement}>-</button>
    </div>
);

const StoreComp = () => (
    <StoreDisplay
        value={Store.getState()}
        onIncrement={() => Store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => Store.dispatch({ type: 'DECREMENT' })}
    />
);

export default StoreComp;
