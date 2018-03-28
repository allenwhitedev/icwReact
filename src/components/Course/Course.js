import React from 'react'
import { connect } from 'react-redux'
import { addCourseItem } from '../../actions.js'
import CKEditor from '../CKEditor/CKEditor.js'

let Course = ({courseName, courseItems, addCourseItemClick}) =>
(
	<div className='Course' style={ {padding: '15px'} }>
		<h2> {courseName} </h2>

		<ul style={ {listStyle: 'none'} }>
			{ courseItems.map( (courseItem, index) => 
				(
					<li key={index} className='coursePost' dangerouslySetInnerHTML={ {__html: courseItem} } ></li>
				) )
			}
		</ul>

    <CKEditor addPostClick={ addCourseItemClick } />

	</div>
)

const mapStateToProps = (state, ownProps) => ({
	courseName: ownProps.courseName,
	courseItems: state.courseItems[ownProps.courseName] ? state.courseItems[ownProps.courseName] : [] //state.posts.courseName['post one', 'post two']
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	addCourseItemClick: (post) => dispatch( addCourseItem(post, ownProps.courseName) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)