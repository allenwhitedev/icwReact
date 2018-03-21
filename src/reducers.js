import { combineReducers } from 'redux'
import {
	// session action types
	REQUEST_SIGNUP, RECEIVE_SIGNUP, 
	REQUEST_LOGIN, RECEIVE_LOGIN, 
	REQUEST_LOGOUT, RECEIVE_LOGOUT,
	RECEIVE_REFRESH_SESSION, // session is refreshed by any authenticated request that succeeds
	REQUEST_COURSES, RECEIVE_COURSES, // courses action types
	REQUEST_POSTS, RECEIVE_POSTS, // posts by courseId action types
	REQUEST_TESTS, RECEIVE_TESTS, // tests action types
	ADD_POST// temporary, used for demo
} from './actions.js'

const rootReducer = combineReducers({
	tests,
	session,
	courses,
	posts
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

function courses(state = { isFetching: false, items: [{courseId: '0ab', courseName: 'CEN3010 - Software Engineering'}, {courseId: '1ab', courseName: 'CDA3101 - Computer Organization'}, {courseId: '1ab', courseName: 'EGS4034 - Engineering Ethics'}] }, action)
{
	switch (action.type)
	{
		case REQUEST_COURSES:
			return { isFetching: true, ...state }
		case RECEIVE_COURSES:
			return { isFetching: false, items: action.items }
		default:
			return state
	}
}


function posts(state = { isFetching: false, 'CEN3010 - Software Engineering': ['post one', 'post two'] }, action)
{
	switch (action.type)
	{
		case ADD_POST: // temporary, used for demo
			if ( state[action.courseName] )
				return { ...state, [action.courseName]: [ ...state[action.courseName], action.post ]  }
			else
				return { ...state, [action.courseName]: [action.post] }
		case REQUEST_POSTS:
			return { isFetching: true, ...state }
		case RECEIVE_POSTS:
			return { isFetching: false, [action.courseName]: action.items }
		default:
			return state
	}
}


export default rootReducer