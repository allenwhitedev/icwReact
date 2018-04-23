import React from 'react'
import { connect } from 'react-redux'
import { 
	addProblem, 
	// removeProblem, // not yet implemented
	editProblemQuestion, 
	addProblemOption, 
	// removeProblemOption, // not yet implemented
	editProblemCorrectOptionIndex } from '../../actions'
import './QuizEditor.css'

let QuizEditor = ({
		problems, 
		courseItemId,
		addProblemClick, 
		editProblemQuestionBlur, 
		addProblemOptionBlur, 
		editProblemCorrectOptionIndexClick,
		fetchAddCourseItemSubmit
	}) =>
(
	<form onSubmit={ e => 
		{
			e.preventDefault()

			let quiz = {
				title: e.target.quizTitle.value,
				type: 'quiz',
				content: 'This is a quiz.',
				problems
			}

			if ( isQuizValid(quiz) )
			{
				fetchAddCourseItemSubmit(quiz)
				e.target.quizTitle.value = '' // reset quiz title
			}
			else
				alert(`Invalid quiz. A quiz requires a title and at least one problem. Each problem require a valid question, at least 2 options, and a correct answer.`)
		}
	}>
		<h3>QuizEditor</h3>
			<hr />
			{ problems.map( (problem, index) => (
				<fieldset className='problem' key={problem.id}>
					<legend>Problem {index + 1}</legend>

					<h5>{problem.question}</h5>
					<ul className='problemOptions'>
						{ problem.options.map( (option, index) => (
							<li key={index} style={ {color: problem.correctOptionIndex === index ? 'green' : 'red'} } onClick={ () => editProblemCorrectOptionIndexClick(problem.id, index) }>{option}</li>
							) )
						}
					</ul>

					<input type='text' placeholder='Question...' defaultValue={problem.question} onBlur={ e => editProblemQuestionBlur(problem.id, e.target.value) } />
					
					<input key={index} type='text' placeholder='Option...' defaultValue={problem.options[problem.options.length - 1]} onBlur={ e => 
						{
							addProblemOptionBlur(problem.id, e.target.value) 
							e.target.value = ''
						}	
					} />
					
				</fieldset>
				) )
			}

			<button type='button' onClick={ () => addProblemClick({id: `${problems.length}${courseItemId}`, question: '', options: [], correctOptionIndex: null}) }>
				Add problem
			</button>

			{ problems.length > 0 &&
				<section>
					<input name='quizTitle' type='text' placeholder='Quiz Title...' />
					<button type='submit'>Submit Quiz</button>
				</section>
			}
	</form>
)

// verify quiz has required fields and all problems are valid before submitting
function isQuizValid(quiz)
{
	console.log('quiz:', quiz)
	if ( quiz.title.length < 1 ) // require non-empty string quiz title
		return false
	for ( let i in quiz.problems ) // verify each problem is valid: a non-empty string question, at least 2 options, a non-null correctOptionIndex (in valid range of options)
	{
		if ( quiz.problems[i].question.length < 1 || quiz.problems[i].options.length < 2 || (!quiz.problems[i].correctOptionIndex && quiz.problems[i].correctOptionIndex !== 0 ) || quiz.problems[i].correctOptionIndex >= quiz.problems[i].options.length )
			return false
	}
	return true // all problems were valid return true
}

const mapStateToProps = (state, ownProps) => ({
	problems: state.entities.problems.allIds.filter( id => id.substring(1, id.length) === ownProps.courseItemId ).map( id => state.entities.problems.byId[id] ),
	courseItemId: ownProps.courseItemId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	addProblemClick: problem => dispatch( addProblem(problem) ),
	editProblemQuestionBlur: (problemId, option) => dispatch( editProblemQuestion(problemId, option) ),
	addProblemOptionBlur: (problemId, option) => { if (option !== '') dispatch( addProblemOption(problemId, option) ) },
	editProblemCorrectOptionIndexClick: (problemId, correctOptionIndex) => dispatch( editProblemCorrectOptionIndex(problemId, correctOptionIndex) ),
	fetchAddCourseItemSubmit: quiz => ownProps.fetchAddCourseItemClick(quiz)
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizEditor)