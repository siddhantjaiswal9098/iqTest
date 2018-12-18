import configureStore from './src/store/store.js';
const store = configureStore(() => {
}).store
// const persistStore = configureStore(() => {
// }).persistStore
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Index from './src/index.js'
import { PersistGate } from 'redux-persist/integration/react'


export default class App extends Component {
  render() {
    console.log('here inside APP.js', store);
    return (
      <Provider store={store}>
        {/* <PersistGate loading={<View style={{ flex: 1, backgroundColor: 'red' }} />} persistor={persistStore}> */}
          <View style={{ flex: 1 }}>
            <Index />
          </View>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

