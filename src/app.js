import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import ScreenContainer from './components/ScreenContainer';

class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
                <ScreenContainer />
            </Provider>
        );
    }
}

export default App;
