import { combineReducers } from 'redux';
import users from './users';
import favorites from './favorites';

const reducer = combineReducers({
  users,
  favorites
})

export default reducer;