import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import rootReducer from './ducks/rootReducer';
import {updateColor} from './ducks/color';
import {GLOBALTON as colorFeedGateway} from './gateways/colorFeed';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
    applyMiddleware(thunk)
);
const store = createStore(rootReducer,enhancers);

colorFeedGateway.onColorChange(newColor => store.dispatch(updateColor(newColor)));
colorFeedGateway.refreshColor();

export default function Reduxed({children}){
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
