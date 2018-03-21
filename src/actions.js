import apiUrl from './index.js'

// - synchronous action creators -
// signup
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP'
function requestSignup()
{
	return { type: REQUEST_SIGNUP }
}
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP'
function receiveSignup(data)
{
	return { type: RECEIVE_SIGNUP, message: data.message, session: data.session }
}
// login
export const REQUEST_LOGIN = 'LOGIN'
function requestLogin()
{
	return { type: REQUEST_LOGIN }
}
export const RECEIVE_LOGIN ='RECEIVE_LOGIN'
function receiveLogin(data)
{
	return { type: RECEIVE_LOGIN, message: data.message, session: data.session }
}
// logout
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
function requestLogout()
{
	return { type: REQUEST_LOGOUT }
}
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'
function receiveLogout()
{
	return { type: RECEIVE_LOGOUT }
}

export const RECEIVE_REFRESH_SESSION = 'RECEIVE_REFRESH_SESSION'
/*
function receiveRefreshSession()
{
	return { type: RECEIVE_REFRESH_SESSION }
}
*/
// courses
export const REQUEST_COURSES = 'REQUEST_COURSES'
function requestCourses()
{
	return { type: REQUEST_COURSES }
}
export const RECEIVE_COURSES = 'REQUEST_COURSES'
function receiveCourses(data)
{
	return { type: RECEIVE_COURSES, items: data }
}
// posts by courseId
export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts()
{
	return { type: REQUEST_POSTS }
}
export const RECEIVE_POSTS = 'RECEIVE_POST'
function receivePosts(data, courseId)
{
	return { type: RECEIVE_POSTS, courseId, items: data }
}

// test action creators
export const REQUEST_TESTS = 'REQUEST_TESTS'
function requestTests()
{
	return { type: REQUEST_TESTS }
}
export const RECEIVE_TESTS = 'RECEIVE_TESTS'
function receiveTests(data)
{
	return { type: RECEIVE_TESTS, tests: data, receivedAt: Date.now() }
}
export const ADD_POST = 'ADD_POST' // temporary (for demo on March 21, 2018)
export function addPost(post, courseName)
{
	return { type: ADD_POST, post, courseName }
}

// - async action creators -
export function fetchTests(requiresAuthentication)
{
	return dispatch =>
	{
		dispatch(requestTests)
		fetch(`${apiUrl}/tests`).then( response => response.json() ).then( data => { dispatch( receiveTests(data) ) } )
	}
}

export function fetchSignup(email, password)
{
	return dispatch =>
	{
		dispatch(requestSignup)
		console.log('body:', JSON.stringify({email, password}) )
		fetch(`${apiUrl}/signup`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password}) }).then( response => response.json() ).then( data => dispatch( receiveSignup(data) ) )
		.catch( error => alert('Invalid email/password, email may already be in use') /*alert(error)*/ )		
	}
}

export function fetchLogin(email, password)
{
	return dispatch =>
	{
		dispatch( requestLogin() )
		fetch(`${apiUrl}/login`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password}) }).then( response => response.json() ).then( data => dispatch( receiveLogin(data) ) )
		.catch( error => alert('Invalid email/password') /*alert(error)*/ )
	}
}

export function fetchLogout(sessionId, userId)
{
	return dispatch =>
	{
		dispatch( requestLogout() )
		fetch(`${apiUrl}/logout`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({sessionId, userId}) } ).then( response => response.json() ).then( data => dispatch(receiveLogout) )
		.catch( error => alert(error) )
	}
}