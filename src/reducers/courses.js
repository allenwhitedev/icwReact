import { combineReducers } from 'redux'
import { REQUEST_COURSES, RECEIVE_COURSES, REQUEST_ADD_COURSE, RECEIVE_ADD_COURSE, RECEIVE_COURSE_ITEMS } from '../actions'

function isFetching(state = false, action) // course items & courses are fetched in same http request
{
	switch (action.type)
	{
		case REQUEST_COURSES:
		case REQUEST_ADD_COURSE:
			return true
		case RECEIVE_COURSES:
		case RECEIVE_ADD_COURSE:
			return false
		default:
			return state
	}
}

function coursesById(state = { 
		'0ab': { _id: '0ab', name: 'Offline Course 1'}, 
		'1ab': {_id: '1ab', name: 'Offline Course 2'}, 
		'2ab': {_id: '2ab', name: 'Offline Course 3'} 
	}, action) 
{
	switch (action.type)
	{
		case RECEIVE_COURSES:	
			let byId = {}
			for ( let i in action.items ) // action.items = courses from backend request
				byId[action.items[i]._id] = {_id: action.items[i]._id, name: action.items[i].name}
			return byId// { ...action.items.map( course => { course._id: { _id: course._id, name: course.name } } ) } // { items: action.items }
		default:
			return state
	}
}

function coursesAllIds( state = ['0ab', '1ab', '2ab'], action )
{
	switch (action.type)
	{
		case RECEIVE_COURSES:
			return action.items.map( course => course._id )
		default:
			return state
	}
}

// note: course items are returned in same fetch that gets courses from backend
function normalizeCourseItemsById(courses) // database store prefers denormalized data, redux prefers normalized data structure (haven't verified it sufficently normalizes data)
{
	let courseItems = {}
	for ( let i in courses )
		for ( let j in courses[i].items )
			courseItems[courses[i].items[j].id] = {courseId: courses[i]._id, ...courses[i].items[j]}
	return courseItems
}
function normalizeCourseItemsAllIds(courses)
{
	let courseItemsAllIds = []
	for ( let i in courses)
		for ( let j in courses[i].items )
			courseItemsAllIds.push(courses[i].items[j].id)
	return courseItemsAllIds
}

function courseItemsById(state = {}, action) 
{
	switch (action.type)
	{
		case RECEIVE_COURSE_ITEMS:
			return normalizeCourseItemsById(action.courses)
		default:
			return state
	}
}

function courseItemsAllIds(state = [], action)
{
	switch (action.type)
	{
		case RECEIVE_COURSE_ITEMS:
			return normalizeCourseItemsAllIds(action.courses)
		default:
			return state
	}
}

// selectors
export function getCourseItemTitleById(courseItems, courseItemId)
{
  let courseItem = courseItems.find( courseItem => courseItem.id === courseItemId )
  return courseItem ? courseItem.title : ''
}

export const courseItems = combineReducers({ // course items reducer
	isFetching,
	byId: courseItemsById,
	allIds: courseItemsAllIds
}) 
export const courses = combineReducers({ // courses reducer
	isFetching,
	byId: coursesById, 
	allIds: coursesAllIds
})

// course items reducer