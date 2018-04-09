import React from 'react'
import { connect } from 'react-redux'
import { fetchAddCourseItem } from '../../actions.js'
import { NavLink } from 'react-router-dom'
import CKEditor from '../CKEditor/CKEditor.js'

let Course = ({courseId, courseItems, fetchAddCourseItemClick, course, sessionRole}) =>
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

		{ sessionRole === 'teacher' && // only display CKEditor if user has role 'teacher'
    	<CKEditor fetchAddCourseItemClick={ fetchAddCourseItemClick } />
  	}
	</div>
)

const mapStateToProps = (state, ownProps) => ({
	courseId: ownProps.courseId,
	course: state.entities.courses.byId[ownProps.courseId],
	courseItems: state.entities.courseItems.allIds.map( id => state.entities.courseItems.byId[id] ).filter( courseItem => courseItem.courseId === ownProps.courseId ), // grab course items for current course
	sessionRole: state.session.role || false 
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchAddCourseItemClick: (courseItem) => dispatch( fetchAddCourseItem(courseItem, ownProps.courseId) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)