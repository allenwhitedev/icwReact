import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

let Sidebar = ({courses, courseName}) =>
(
	<div className='Sidebar'>
		<ul style={ {listStyle: 'none', textAlign: 'center'} }>
		{
			courses.map( (course, index) => 
			(
				<li key={index}> <NavLink to={`/courses/${course.courseName}`}>{course.courseName}</NavLink> </li>
			) )
		}
		</ul>
		
	</div>
)

const mapStateToProps = state => ({
	courses: state.courses.items
})

export default connect(mapStateToProps)(Sidebar)