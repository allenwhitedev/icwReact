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
	RECEIVE_COURSE_ITEMS, // course items are returned in same fetch that gets courses from backend
	ADD_COURSE_ITEM, // temporary, used for demo
	REQUEST_ADD_COURSE, RECEIVE_ADD_COURSE 
} from './actions.js'

const rootReducer = combineReducers({
	tests,
	session,
	courses,
	courseItems
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

function courses(state = { isFetching: false, items: [{_id: '0ab', name: 'Offline Course 1'}, {_id: '1ab', name: 'Offline Course 2'}, {_id: '1ab', name: 'EGS4034 - Engineering Ethics'}] }, action)
{
	switch (action.type)
	{
		case REQUEST_COURSES:
			return { isFetching: true, ...state }
		case RECEIVE_COURSES:	
			return { isFetching: false, items: action.items }
		case REQUEST_ADD_COURSE: // temporary, used for demo
			return { isFetching: true, items: [...state.items, {_id: `'optimisticUITempId${state.items.length}`, name: action.courseName }] }
		case RECEIVE_ADD_COURSE:
			return { isFetching: false, ...state }
		default:
			return state
	}
}


function normalizeCourseItems(courses) // database store prefers denormalized data, redux prefers normalized data structure (haven't verified it sufficently normalizes data)
{
	let courseItems = []
	for ( let i in courses )
		for ( let j in courses[i].items )
			courseItems.push({courseId: courses[i]._id, ...courses[i].items[j]})
	return courseItems
}
function courseItems(state = { isFetching: false, items: [] }, action)
{
	switch (action.type)
	{
		case ADD_COURSE_ITEM: // temporary, used for demo
			if ( state[action.courseName] )
				return { ...state, [action.courseName]: [ ...state[action.courseName], action.post ]  }
			else
				return { ...state, [action.courseName]: [action.post] }
		case REQUEST_POSTS:
			return { isFetching: true, ...state }
		case RECEIVE_POSTS:
			return { isFetching: false, [action.courseName]: action.items }
		case RECEIVE_COURSE_ITEMS:
			return { ...state, items: normalizeCourseItems(action.courses) }
		default:
			return state
	}
}


export default rootReducer