import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import ScreenContainer from './components/screens/ScreenContainer';

class App extends Component {
    render() {
        const store = createStore(reducers);

        return (
            <Provider store={store}>
                <ScreenContainer store={store} />
            </Provider>
        );
    }
}

export default App;
