import { combineReducers } from 'redux';
import datatableReducer from './datatable';
import tableSetReducer from './tableset';


export default combineReducers({
    datatableReducer,tableSetReducer
});
