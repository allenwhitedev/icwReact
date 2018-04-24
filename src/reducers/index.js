import { combineReducers } from 'redux'
import {
	// session action types
	REQUEST_SIGNUP, RECEIVE_SIGNUP, 
	REQUEST_LOGIN, RECEIVE_LOGIN, 
	REQUEST_LOGOUT, RECEIVE_LOGOUT,
	RECEIVE_REFRESH_SESSION, // *tba: session is refreshed by any authenticated request that succeeds
	SET_ARCHITECTURE_LEVEL, SET_SEARCH // ui
} from '../actions.js'
// import reducers
import tests from './tests'
import {courses, courseItems} from './courses'
import users from './users'
import problems from './problems'

const entities = combineReducers({
	courses, 
	courseItems,
	problems,
	tests, 
	users
})

function session(state, action)
{
	switch (action.type)
	{
		case REQUEST_SIGNUP:
			return { isFetching: true, ...state, }
		case RECEIVE_SIGNUP:
			// save session in localStorage to persist
			localStorage.setItem('userId', action.session.userId); localStorage.setItem('sessionId', action.session.sessionId) 
			localStorage.setItem('expiresAt', action.session.expiresAt); localStorage.setItem('role', action.session.role)
			window.location.reload() // temporary method of redirect
			return { isFetching: false, userId: action.session.userId, sessionId: action.session.sessionId, expiresAt: action.session.expiresAt, role: action.session.role }
		case REQUEST_LOGIN:
			return { isFetching: true, ...state }
		case RECEIVE_LOGIN:
			// save session in localStorage to persist
			localStorage.setItem('userId', action.session.userId); localStorage.setItem('sessionId', action.session.sessionId)
			localStorage.setItem('expiresAt', action.session.expiresAt); localStorage.setItem('role', action.session.role)
			window.location.reload() // temporary method of redirect
			return { isFetching: false, userId: action.session.userId, sessionId: action.session.sessionId, expiresAt: action.session.expiresAt, role: action.session.role }
		case REQUEST_LOGOUT:
			return { isFetching: true }
		case RECEIVE_LOGOUT:
			// save session in localStorage to persist
			localStorage.removeItem('userId'); localStorage.removeItem('sessionId'); localStorage.removeItem('expiresAt'); localStorage.removeItem('role')
			window.location.reload() // temporary method of redirect
			return { isFetching: false } // wipe all session data except isFetching			
		case RECEIVE_REFRESH_SESSION:
			console.log(`'session reducer's case REFRESH_SESSION tba`)
			return state
		default:
			if ( parseInt(localStorage.getItem('expiresAt'), 10) > Date.now() ) // do not load session from localStorage if it is expired
				return {isFetching: false, userId: localStorage.getItem('userId'), sessionId: localStorage.getItem('sessionId'), 
					expiresAt: parseInt(localStorage.getItem('expiresAt'), 10), role: localStorage.getItem('role') } // by default load session from localStorage
			else
				return { isFetching: false }
	}
}

function ui(state = {architectureLevel: 'WorkShop', search: ''}, action)
{
	switch (action.type)
	{
		case SET_ARCHITECTURE_LEVEL:
			return { ...state, architectureLevel: action.architectureLevel }
		case SET_SEARCH:
			return { ...state, search: action.search }
		default:
			return state
	}
}

const rootReducer = combineReducers({
	entities,
	session,
	ui
}) 
export default rootReducer
