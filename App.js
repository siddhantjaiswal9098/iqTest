/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/store';
import Index from './src/index';

const { store } = configureStore(() => {});
// import { PersistGate } from 'redux-persist/integration/react'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Index />
        </View>
      </Provider>
    );
  }
}
