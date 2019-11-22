import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';
const middleware = [thunk];
const store = createStore(rootReducer,{},compose(applyMiddleware(...middleware),
window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f));
export default store;