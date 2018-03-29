import React from 'react'
import { connect } from 'react-redux'
import { fetchAddCourseItem } from '../../actions.js'
import { NavLink } from 'react-router-dom'
import CKEditor from '../CKEditor/CKEditor.js'

let Course = ({courseId, courseItems, fetchAddCourseItemClick, course}) =>
(
	<div className='Course' style={ {padding: '15px'} }>
		<h2> {course.name} </h2>

		<ul style={ {listStyle: 'none'} }>
			{ courseItems.map( (courseItem, index) => 
				(
					<li key={courseItem.id}> <NavLink to={`/courses/${courseId}/${courseItem.id}`} >{courseItem.title}</NavLink> </li>
					// <li key={index} className='coursePost' dangerouslySetInnerHTML={ {__html: courseItem.content} } ></li>
				) )
			}
		</ul>

    <CKEditor fetchAddCourseItemClick={ fetchAddCourseItemClick } />

	</div>
)

const mapStateToProps = (state, ownProps) => ({
	courseId: ownProps.courseId,
	// this .find() mess is probably why data needs to be structed byIds. ( and normalized? https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape )
	course: state.courses.items.find( course => course._id === ownProps.courseId ) ? state.courses.items.find( course => course._id === ownProps.courseId ) : {name: 'Course not loaded yet'}, 
	courseItems: state.courseItems.items.filter( courseItem => courseItem.courseId === ownProps.courseId ) ? state.courseItems.items.filter( courseItem => courseItem.courseId === ownProps.courseId ) : []
	//courseItems: state.courseItems[ownProps.courseName] ? state.courseItems[ownProps.courseName] : [] //state.posts.courseName['post one', 'post two']
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchAddCourseItemClick: (courseItem) => dispatch( fetchAddCourseItem(courseItem, ownProps.courseId) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)