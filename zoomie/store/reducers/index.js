import { combineReducers } from 'redux';
import users from './users';
import favorites from './favorites';
import chats from './chats';
import items from './items';
import transactions from './transactions';
import garages from './garages';
import reviews from './reviews';

const reducer = combineReducers({
  users,
  favorites,
  chats,
  items,
  transactions,
  garages,
  reviews,
})

export default reducer;