import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import app from './reducers';

export default function configureStore() {
  return createStore(app, applyMiddleware(thunk));
  // body...
}
