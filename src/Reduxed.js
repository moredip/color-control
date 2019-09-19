import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux';

import rootReducer from './ducks/rootReducer';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function Reduxed({children}){
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
