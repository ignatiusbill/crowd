import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import Router from './Router';

export default class App extends Component {
    render() {
        const store = createStore(reducers);

        return (
            <Provider store={store}>
                <Router store={store}/>
            </Provider>
        );
    }
}
