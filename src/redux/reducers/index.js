import { combineReducers } from 'redux';
import postReducer from './postReducer';

export default combineReducers({
  posts: postReducer,
});

// const initialState = {
//     articles: []
//   };
//   function rootReducer(state = initialState, action) {
//     return state;
//   };
//   export default rootReducer;