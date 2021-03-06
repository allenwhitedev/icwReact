import { combineReducers } from 'redux'
import { RECEIVE_LOGIN, REQUEST_USERS, RECEIVE_USERS, RECEIVE_COMPLETE_COURSE_ITEM, RECEIVE_ASSIGN_COURSE_ITEM } from '../actions'

function isFetching(state = false, action)
{
	switch (action.type)
	{
		case REQUEST_USERS:
			return true
		case RECEIVE_USERS:
			return false
		default:
			return state
	}
}

function byId(state = getCachedById(), action)
{
	switch (action.type)
	{
		case RECEIVE_LOGIN:
			// cache completed & assigned course items when logging in
			if ( action.session )
			{	
				localStorage.setItem('completedCourseItems', JSON.stringify(action.completedCourseItems) ) 
			 	localStorage.setItem('assignedCourseItems', JSON.stringify(action.assignedCourseItems) )
				return { ...state, [action.session.userId]: { completedCourseItems: action.completedCourseItems, assignedCourseItems: action.assignedCourseItems } }
			}
			else
				return state
		case RECEIVE_COMPLETE_COURSE_ITEM:
			let completedCourseItems = [ ...state[action.userId].completedCourseItems, action.completedCourseItem]
			localStorage.setItem('completedCourseItems', JSON.stringify(completedCourseItems) ) // cache completed course item 
			return { ...state, [action.userId]: { ...state[action.userId], completedCourseItems } }
		case RECEIVE_USERS:
			let byId = {}
			for ( let i in action.users )
				byId[action.users[i]._id] = { ...action.users[i]  }
			return byId
		case RECEIVE_ASSIGN_COURSE_ITEM:
			return {
				...state,
				[action.userId]: { 
					...state[action.userId],
					assignedCourseItems: [...state[action.userId].assignedCourseItems, action.assignedCourseItem]
				}
			}
		default:
			return state	
	}
}

function allIds(state = getCachedAllIds(), action)
{
	switch (action.type)
	{
		case RECEIVE_LOGIN:
			return [...state, action.session.userId]
		case RECEIVE_USERS:
			return [ ...action.users.map( user => user._id) ]
		default:
			return state		
	}
}

// used to get default student user data from cache (localStorage)
function getCachedById() 
{
	let userId = localStorage.getItem('userId')
	let completedCourseItems = JSON.parse( localStorage.getItem('completedCourseItems') ) || []
	let assignedCourseItems = JSON.parse( localStorage.getItem('assignedCourseItems') ) || []
	return userId ? { [userId]: {completedCourseItems, assignedCourseItems} } : {}
}
function getCachedAllIds()
{
	let userId = localStorage.getItem('userId')
	return userId ? [userId] : []
}

// selectors
export function isCourseItemCompleted(users, courseItemId, userId)
{
	return users.byId[userId].completedCourseItems.find( courseItem => courseItem.courseItemId === courseItemId ) ? true : false
}
export function isCourseItemCompletedGivenCompletedCourseItems(completedCourseItems, courseItemId)
{
	return completedCourseItems.find( courseItem => courseItem.courseItemId === courseItemId ) ? true : false 
}
export function getCourseItemIdsByType(courseItems, type)
{
	return courseItems.filter( courseItem => courseItem.type === type ).map( courseItem => courseItem.id )
}
export function getGradeColor(grade)
{
	if ( grade >= .8)
		return 'green'
	else if ( grade >= .7 )
		return '#424242' // black
	else if ( grade >= .5 )
		return '#EF5350' // light red
	else
		return 'red' // dark red
}


const users = combineReducers({
	isFetching,
	byId,
	allIds,
})

export default users