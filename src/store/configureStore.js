import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import uiReducer from './reducers/uiReducer'
import questionnaireReducer from './reducers/questionnaireReducer'
import userReducer from './reducers/userReducer'
const rootReducer = combineReducers({
  authentication: authReducer,
  ui: uiReducer,
  questionnaire:questionnaireReducer,
  userData:userReducer
})

let composeEnhancers = compose

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}

export default configureStore
