import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';
import './styles/index.scss';
import App from './app/App';

import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import projectsReducer from './redux/reducers/projectsReducer';

const store = createStore(
  // combineReducers({ projectsReducer }),
  projectsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
