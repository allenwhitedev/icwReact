import React from 'react'
import { connect } from 'react-redux'
import { fetchEditCourseItem, fetchAddSubCourseItem } from '../../actions'
import CKEditor from '../CKEditor/CKEditor.js'

class CourseItem extends React.Component {
	constructor(props)
	{
		super(props)
		this.state = { isEditing: false, isAddingSubCourseItem: false } 
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
						{ !this.state.isEditing &&
							<button onClick={ () => this.setState( (prevState) => ({isAddingSubCourseItem: !prevState.isAddingSubCourseItem}) ) }> { this.state.isAddingSubCourseItem ? 'Stop Adding Sub Course Item' : 'Add Sub Course Item'}</button>
						}						

						{ this.state.isEditing && !this.state.isAddingSubCourseItem && // edit course item CKEditor
							<CKEditor fetchEditCourseItemClick={ this.props.fetchEditCourseItemClick } editingContent={this.props.courseItem.content} type={ this.props.courseItem.type } />
						}

						{ this.state.isAddingSubCourseItem && !this.state.isEditing && // add sub course item CKEditor
							<CKEditor isAddingSubCourseItem={true} fetchAddSubCourseItemClick={ this.props.fetchAddSubCourseItemClick } type={ this.props.courseItem.type } />
						}	
					</section>
				}
				
				<h2>{ this.props.courseItem.title }</h2>
				<hr />
				<section style={ {padding: '15px'} } className='courseItemContent' dangerouslySetInnerHTML={ {__html: this.props.courseItem.content} }></section>
			</div>
		)
	}
} 

const mapStateToProps = (state, ownProps) => ({
	sessionRole: state.session.role,
	courseItem: state.entities.courseItems.byId[ownProps.match.params.courseItemId],
	location: ownProps.location
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchEditCourseItemClick: (type, content) => dispatch( fetchEditCourseItem(ownProps.match.params.courseId, ownProps.match.params.courseItemId, type, content) ),
	fetchAddSubCourseItemClick: (type, title, content) => dispatch( fetchAddSubCourseItem(ownProps.match.params.courseId, ownProps.match.params.courseItemId, type, title, content) )
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseItem)