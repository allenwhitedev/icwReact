import React from 'react'
import { connect } from 'react-redux'
import { fetchEditCourseItem } from '../../actions'
import CKEditor from '../CKEditor/CKEditor.js'

class CourseItem extends React.Component {
	constructor(props)
	{
		super(props)
		this.state = { isEditing: false } 
	}

	render()
	{
		return(
			<div className='CourseItem' style={ {paddingLeft: '315px', position: 'absolute', left: '0px', top: '100px'} }>
				{ this.props.sessionRole === 'teacher' && // only show edit button to users with role 'teacher'
					<button onClick={ () => this.setState( (prevState) => ({isEditing: !prevState.isEditing}) ) }> { this.state.isEditing ? 'Stop Editing' : 'Edit'}</button>
				}
				
				{ this.state.isEditing &&
					<CKEditor fetchEditCourseItemClick={ this.props.fetchEditCourseItemClick } editingContent={this.props.courseItem.content} type={ this.props.courseItem.type } />
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
	fetchEditCourseItemClick: (type, content) => dispatch( fetchEditCourseItem(ownProps.match.params.courseId, ownProps.match.params.courseItemId, type, content) )
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseItem)