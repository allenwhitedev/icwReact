// reducers use slice reducer composition -> https://redux.js.org/recipes/structuring-reducers/updating-normalized-data
import { combineReducers } from 'redux'
import { REQUEST_TESTS, RECEIVE_TESTS } from '../actions'

function isFetching(state = false, action)
{
	switch ( action.type )
	{
		case REQUEST_TESTS:
			return true
		case RECEIVE_TESTS:
			return false
		default:
			return state
	}
}

function byId(state = { 		 
		'offlineId0': { message: 'Default offline test message 1'},
		'offlineId1': { message: 'Default offline test message 2' }
	}, action) 
{
	switch (action.type)
	{
		case RECEIVE_TESTS:
			let byId = {}
			for ( let i in action.tests )
				byId[action.tests[i].createdAt] = { message: action.tests[i].message }
			return byId // { action.tests.map( test => test.createdAt: { message: test.message } ) }
		default:
			return state 
	}
}

function allIds(state = ['offlineId0', 'offlineId1'] , action)
{
	switch (action.type)
	{
		case RECEIVE_TESTS:
			return [ action.tests.map( test => test.createdAt) ]
		default:
			return state
	}	
}

const tests = combineReducers({
	isFetching,
	byId,
	allIds
})
export default tests