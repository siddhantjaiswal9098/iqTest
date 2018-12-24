
  import { createStore, applyMiddleware, compose } from 'redux';
  import { AsyncStorage } from 'react-native';
  import storage from 'redux-persist/lib/storage'
  import { persistStore, persistReducer, autoRehydrate} from 'redux-persist';
  import createSagaMiddleware from 'redux-saga';
  import reducer from './../reducers/index';
  import rootSaga from './../sagas';
  
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware,];
  const persistConfig = {
      key: 'root',
      storage: AsyncStorage,
      blacklist: ['ReducerMenu','ReducerSpinner']
  };
  const persistedReducer = persistReducer(persistConfig, reducer);
  
  export default function configureStore(onCompletion) {
      const enhancer = compose(
          applyMiddleware(
              ...middleware,
          ),
      );
      const store = createStore(persistedReducer, enhancer);
      sagaMiddleware.run(rootSaga);
      let persistor = persistStore(store,onCompletion)
      return { store, persistor }
  }


//  const sagaMiddleware = createSagaMiddleware();
// const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(rootSaga);
// export default store;