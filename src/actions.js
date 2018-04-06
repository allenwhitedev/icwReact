const apiUrl = 'http://localhost:8000/api/v1' // apiUrl changes depending on environment (development/production/test)

// tests 
export const REQUEST_TESTS = 'REQUEST_TESTS'
export const RECEIVE_TESTS = 'RECEIVE_TESTS'

function requestTests() { return { type: REQUEST_TESTS } }
function receiveTests(data) { return { type: RECEIVE_TESTS, tests: data, receivedAt: Date.now() } }
export function fetchTests(requiresAuthentication) /* exported functions beginning with fetch are async */
{
	return dispatch =>
	{
		dispatch(requestTests)
		fetch(`${apiUrl}/tests`).then( response => response.json() ).then( data => { dispatch( receiveTests(data) ) } )
	}
}

// signup
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP'
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP'

function requestSignup() { return { type: REQUEST_SIGNUP } }
function receiveSignup(data) { return { type: RECEIVE_SIGNUP, message: data.message, session: data.session } }
export function fetchSignup(email, password)
{
	return dispatch =>
	{
		dispatch(requestSignup)
		fetch(`${apiUrl}/signup`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password}) }).then( response => response.json() ).then( data => dispatch( receiveSignup(data) ) )
		.catch( error => alert('Invalid email/password, email may already be in use') /*alert(error)*/ )		
	}
}

// login
export const REQUEST_LOGIN = 'LOGIN'
export const RECEIVE_LOGIN ='RECEIVE_LOGIN'

function requestLogin() {	return { type: REQUEST_LOGIN } }
function receiveLogin(data) { return { type: RECEIVE_LOGIN, message: data.message, session: data.session } }
export function fetchLogin(email, password)
{
	return dispatch =>
	{
		dispatch( requestLogin() )
		fetch(`${apiUrl}/login`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password}) }).then( response => response.json() ).then( data => dispatch( receiveLogin(data) ) )
		.catch( error => alert('Invalid email/password') /*alert(error)*/ )
	}
}

// logout
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'

function requestLogout() { return { type: REQUEST_LOGOUT } }
function receiveLogout() { return { type: RECEIVE_LOGOUT } }
export function fetchLogout(sessionId, userId)
{
	return dispatch =>
	{
		dispatch( requestLogout() )
		fetch(`${apiUrl}/logout`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({sessionId, userId}) } ).then( response => response.json() ).then( data => dispatch( receiveLogout() ) )
		.catch( error => alert(error) )
	}
}

// *tba: refresh_session functionality 
export const RECEIVE_REFRESH_SESSION = 'RECEIVE_REFRESH_SESSION'
/*function receiveRefreshSession()
{
	return { type: RECEIVE_REFRESH_SESSION }
}*/

// courses
export const REQUEST_COURSES = 'REQUEST_COURSES'
export const RECEIVE_COURSES = 'RECEIVE_COURSES'
export const RECEIVE_COURSE_ITEMS = 'RECEIVE_COURSE_ITEMS'
export const REQUEST_ADD_COURSE = 'REQUEST_ADD_COURSE'
export const RECEIVE_ADD_COURSE = 'RECEIVE_ADD_COURSE'
export const REQUEST_ADD_COURSE_ITEM = 'REQUEST_ADD_COURSE_ITEM'
export const RECEIVE_ADD_COURSE_ITEM = 'RECEIVE_COURSE_ITEM'

function requestCourses() { return { type: REQUEST_COURSES } }
function receiveCourses(data) { return { type: RECEIVE_COURSES, items: data } }
function receiveCourseItems(data) {	return { type: RECEIVE_COURSE_ITEMS, courses: data } }
function requestAddCourse(courseName) { return { type: REQUEST_ADD_COURSE, courseName } }
function receiveAddCourse(courseName) { return { type: RECEIVE_ADD_COURSE } }
function requestAddCourseItem(courseId) { return { type: REQUEST_ADD_COURSE_ITEM, courseId } }
function receiveAddCourseItem(data) { return { type: RECEIVE_ADD_COURSE_ITEM, courseItem: data } }
export function fetchCourses()
{
	return (dispatch, getState) =>
	{
		let session = getState().session
		let sessionCookie = `sessionId=${session.sessionId}; userId=${session.userId};`
		
		dispatch( requestCourses() )
		fetch(`${apiUrl}/courses`, {headers: {'Session': sessionCookie}}).then( response => response.json() ).then( data => { dispatch( receiveCourses(data) ); dispatch( receiveCourseItems(data) ) } )
			.catch( error => alert('Error: Could not fetch courses. ' + error) )	
	}
}
export function fetchAddCourse(courseName)
{
	return (dispatch, getState) =>
	{
		let session = getState().session
		let sessionCookie = `sessionId=${session.sessionId}; userId=${session.userId};`
		
		dispatch( requestAddCourse(courseName) ) // provide course name for optimistic ui
		fetch(`${apiUrl}/courses`, {method: 'POST', headers: {'Content-Type': 'application/json', 'Session': sessionCookie }, body: JSON.stringify({name: courseName})}).then( response => response.json() )
			.then( data => { dispatch( receiveAddCourse(courseName) ); dispatch( fetchCourses() ) } )
			.catch( error => alert(`Error: Could not add course '${courseName}'. Are you logged in with a 'teacher' user? ${error}`) )		
	}
}
export function fetchAddCourseItem(courseItem, courseId)
{
	return (dispatch, getState) =>
	{
		let session = getState().session
		let sessionCookie = `sessionId=${session.sessionId}; userId=${session.userId};`
		
		dispatch( requestAddCourseItem(courseId) )
		fetch(`${apiUrl}/courses/${courseId}`, {method: 'POST', headers: {'Content-Type': 'application/json', 'Session': sessionCookie}, body: JSON.stringify(courseItem) })
			.then( response => response.json() ).then( data => { dispatch( receiveAddCourseItem(data) ); dispatch( fetchCourses() ) } ) // fetch courses as db may perform some operations on courseItem content to make it safe 
			.catch( error => alert(`Error: Could not add item to course with id '${courseId}'. Are you logged in with a 'teacher' user? ${error}`) )			
	}
}