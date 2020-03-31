import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import rootReducer from './ducks/rootReducer';
import {refreshColorFromBackend} from './ducks/color';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
    applyMiddleware(thunk)
);
const store = createStore(rootReducer,enhancers);

store.dispatch(refreshColorFromBackend());

export default function Reduxed({children}){
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
