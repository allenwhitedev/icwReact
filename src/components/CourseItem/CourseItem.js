import React from 'react'
import { connect } from 'react-redux'
import { fetchEditCourseItem, fetchAddSubCourseItem, fetchCompleteCourseItem, setArchitectureLevel } from '../../actions'
import CKEditor from '../CKEditor/CKEditor.js'
import { isCourseItemCompletedGivenCompletedCourseItems } from '../../reducers/users'

class CourseItem extends React.Component {
	constructor(props)
	{
		super(props)
		this.state = { isEditing: false, isAddingSubCourseItem: false, answers: [], numWrongAnswerAttempts: 0 } 
	}

	isAnswerCorrect(problemIndex)
	{
		if ( this.state.answers[problemIndex] === this.props.courseItem.problems[problemIndex].correctOptionIndex ) // return correct answer styles
			return (<i className="material-icons problemIcon green">check</i>) // correctAnswer
		else if ( !this.state.answers[problemIndex] && this.state.answers[problemIndex] !== 0 ) 
			return (<i className="material-icons problemIcon">help_outline</i>) // unanswered
		else // return incorrect styles
			return (<i className="material-icons problemIcon red">clear</i>) // incorrectAnswer
	}

	fetchCompleteQuizIfComplete() // check all problems have been answered correctly before allowing user to complete quiz
	{
		for ( let i in this.props.courseItem.problems )
			if ( !(this.state.answers[i] === this.props.courseItem.problems[i].correctOptionIndex)/* correct answer*/ )
				return false 

		// all problems had parallel correct answers in local state, complete quiz if not already completed
		if ( !isCourseItemCompletedGivenCompletedCourseItems(this.props.completedCourseItems, this.props.courseItem.id) ) 
			this.props.fetchCompleteQuiz(this.props.courseItem.id, ( 1 - ( this.state.numWrongAnswerAttempts / this.props.courseItem.problems.length) ) )
	}	

	componentDidMount()
	{
		if ( this.props.architectureLevel !== 'WorkBench' )
			this.props.setArchitectureLevel('WorkBench')
	}	

	render()
	{
		return(
			<div className='CourseItem' style={ {paddingLeft: '315px', position: 'absolute', left: '0px', top: '100px'} }>
				{ this.props.sessionRole === 'teacher' && // only show edit button to users with role 'teacher'
					<section className='courseItemEditingArea'>
						{ !this.state.isAddingSubCourseItem &&
							<button onClick={ () => this.setState( (prevState) => ({isEditing: !prevState.isEditing}) ) }> { this.state.isEditing ? 'Stop Editing' : 'Edit'}</button>	
						}
						{ !this.state.isEditing && !this.props.courseItem.parentCourseItemId && // (do not allow users to add sub course items to sub course items)
							<button onClick={ () => this.setState( (prevState) => ({isAddingSubCourseItem: !prevState.isAddingSubCourseItem}) ) }> { this.state.isAddingSubCourseItem ? 'Stop Adding Sub Course Item' : 'Add Sub Course Item'}</button>
						}						

						{ this.state.isEditing && !this.state.isAddingSubCourseItem && // edit course item CKEditor
							<CKEditor fetchEditCourseItemClick={ this.props.fetchEditCourseItemClick } editingContent={this.props.courseItem.content} type={ this.props.courseItem.type } />
						}

						{ this.state.isAddingSubCourseItem && !this.state.isEditing && !this.props.courseItem.parentCourseItemId && // add sub course item CKEditor (do not allow users to add sub course items to sub course items)
							<CKEditor isAddingSubCourseItem={true} fetchAddSubCourseItemClick={ this.props.fetchAddSubCourseItemClick } type={ this.props.courseItem.type } />
						}	
					</section>
				}
				
				<h2>{ this.props.courseItem.title }</h2>
				<hr />
				<section style={ {padding: '15px'} } className='courseItemContent' dangerouslySetInnerHTML={ {__html: this.props.courseItem.content} }></section>
			
				{ this.props.courseItem.type === 'quiz' && // render problems if course item is quiz
					<ul style={ {listStyle: 'none'} }>
						{ this.props.courseItem.problems.map( problem => (
							<li key={problem.id} className='problem'> 
								<h4> { this.isAnswerCorrect( parseInt(problem.id, 10) ) } {parseInt(problem.id, 10) + 1}. {problem.question}</h4> 
								{ problem.options.map( (option, index) => (
									<button key={index} onClick={ () => 
										{
											let newAnswers = [...this.state.answers] // copy answers to avoid mutating
											let isOptionWrong = 0

											if ( newAnswers[ parseInt(problem.id, 10) ] === undefined && problem.correctOptionIndex !== index ) // only mark answers wrong on first attempt
												isOptionWrong = 1
											
											newAnswers[ parseInt(problem.id, 10) ] = index // add user-chosen option to CourseItem's local state's answers array
											
											// update CourseItem local state
											this.setState((prevState) => ({answers: newAnswers, numWrongAnswerAttempts: prevState.numWrongAnswerAttempts + isOptionWrong}), this.fetchCompleteQuizIfComplete )
											
										} }>
										{option}
									</button>
								) )
								}
							</li>
							) )
						}
					</ul>
				}

			</div>
		)
	}
} 

CourseItem.defaultProps = {
	courseItem: {parentCourseItemId: false} // needed to render on refresh
}

const mapStateToProps = (state, ownProps) => ({
	sessionRole: state.session.role,
	courseItem: state.entities.courseItems.byId[ownProps.match.params.courseItemId],
	location: ownProps.location,
	completedCourseItems: state.entities.users.byId[state.session.userId].completedCourseItems || [],
	architectureLevel: state.ui.architectureLevel
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchEditCourseItemClick: (type, content) => dispatch( fetchEditCourseItem(ownProps.match.params.courseId, ownProps.match.params.courseItemId, type, content) ),
	fetchAddSubCourseItemClick: (type, title, content) => dispatch( fetchAddSubCourseItem(ownProps.match.params.courseId, ownProps.match.params.courseItemId, type, title, content) ),
	fetchCompleteQuiz: (courseItemId, grade) => dispatch( fetchCompleteCourseItem(courseItemId, grade) ),
	setArchitectureLevel: architectureLevel => dispatch( setArchitectureLevel(architectureLevel) )
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseItem)