import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import entitiesReducer from './entitiesReducer';

export default combineReducers({
  entities: entitiesReducer,
  auth: authReducer,
  form: reduxForm,
});
