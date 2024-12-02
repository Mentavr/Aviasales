import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import ticketsReducer from './ticketsReducer';
import apiTicketsReducer from './services/apiTicketsReducer';

const rootReducer = combineReducers({
  filter: filterReducer,
  tickets: ticketsReducer,
  apiTickets: apiTicketsReducer,
});

export default rootReducer;