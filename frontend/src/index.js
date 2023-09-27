import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';
import './styles/index.scss';
import App from './app/App';

import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import projectsReducer from './redux/reducers/projectsReducer';
import modalReducer from './redux/reducers/modalReducer';
import tasksReducer from './redux/reducers/tasksReducer';
import subtasksReducer from './redux/reducers/subtasksReducer';

const rootReducer = combineReducers({
  projectsReducer,
  modalReducer,
  tasksReducer,
  subtasksReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
