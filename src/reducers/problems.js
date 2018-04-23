import { combineReducers } from 'redux'
import { ADD_PROBLEM, REMOVE_PROBLEM, RECEIVE_PROBLEMS, EDIT_PROBLEM_QUESTION, ADD_PROBLEM_OPTION, REMOVE_PROBLEM_OPTION, EDIT_PROBLEM_CORRECT_OPTION_INDEX } from '../actions'

function byId(state = {}, action)
{
	switch (action.type)
	{
		case ADD_PROBLEM: 
			return { ...state, [action.problem.id]: { ...action.problem } }
		case REMOVE_PROBLEM:
			let { [action.problemId]: deleteItem, ...rest } = state // use es6 spread operator to remove data without mutating
			return rest
		case EDIT_PROBLEM_QUESTION:
			return { 
				...state, 
				[action.problemId]: { 
					...state[action.problemId], 
					question: action.question
				} 
			}
		case ADD_PROBLEM_OPTION:
			return { 
				...state, 
				[action.problemId]: { 
					...state[action.problemId], 
					options: [ ...state[action.problemId].options, action.option ] 
				} 
			}
		case REMOVE_PROBLEM_OPTION:
			return state // *tba: modify correctOptionIndex or set it to null as well
		case EDIT_PROBLEM_CORRECT_OPTION_INDEX:
			return {
				...state,
				[action.problemId]: {
					...state[action.problemId],
					correctOptionIndex: action.correctOptionIndex
				}
			}
		case RECEIVE_PROBLEMS:
			// *tba once problems are normalized (right now they are nested in courseItems of type quiz)
			return state
		default:
			return state
	}
}

function allIds(state = [], action)
{
	switch (action.type)
	{
		case ADD_PROBLEM:
			return [...state, action.problem.id]
		case REMOVE_PROBLEM:
			return state.filter( id => id !== action.problemId )
		default:
			return state
	}
}

const problems = combineReducers({
	byId,
	allIds
})

export default problems