import { combineReducers } from 'redux'
import {
	// session action types
	REQUEST_SIGNUP, RECEIVE_SIGNUP, 
	REQUEST_LOGIN, RECEIVE_LOGIN, 
	REQUEST_LOGOUT, RECEIVE_LOGOUT,
	RECEIVE_REFRESH_SESSION, // session is refreshed by any authenticated request that succeeds
	REQUEST_TESTS, RECEIVE_TESTS // tests action types
} from './actions.js'

const rootReducer = combineReducers({
	tests,
	session
})

function tests(state = { isFetching: false, items: [{message: 'Default offline test message'}] }, action)
{
	switch (action.type)
	{
		case REQUEST_TESTS:
			return { ...state, isFetching: true }
		case RECEIVE_TESTS:
			return { ...state, items: action.tests, isFetching: false }
		default:
			return state 
	}
}

function session(state = {}, action)
{
	switch (action.type)
	{
		case REQUEST_SIGNUP:
			return { isFetching: true, ...state, }
		case RECEIVE_SIGNUP:
			return { isFetching: false, userId: action.session.userId, sessionId: action.session.sessionId, expiresAt: action.session.expiresAt }
		case REQUEST_LOGIN:
			return { isFetching: true, ...state }
		case RECEIVE_LOGIN:
			return { isFetching: false, userId: action.session.userId, sessionId: action.session.sessionId, expiresAt: action.session.expiresAt }
		case REQUEST_LOGOUT:
			return { isFetching: true }
		case RECEIVE_LOGOUT:
			return { isFetching: false } // wipe all session data except isFetching
		case RECEIVE_REFRESH_SESSION:
			console.log(`'session reducer's case REFRESH_SESSION tba`)
			return state
		default:
			return state
	}
}

export default rootReducer