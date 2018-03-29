import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchCourses, fetchAddCourse } from '../../actions.js'
import './Sidebar.css'

class Sidebar extends React.Component 
{ 
	//({courses, courseName}) 
	componentDidMount()
	{
		if ( this.props.session.expiresAt && this.props.session.expiresAt > Date.now() ) // fetch courses when component mounts if session is not expired
			this.props.fetchCourses()
	}

	render()
	{
		return (
			<div className='Sidebar'>
				<ul style={ {listStyle: 'none', textAlign: 'center'} }>
				{
					this.props.courses.map( (course, index) => 
					(
						<li key={index}> <NavLink to={`/courses/${course.name}`}>{course.name}</NavLink> </li>
					) )
				}
				</ul>
				

				<form onSubmit={ e =>
				{
					e.preventDefault()

					let courseName = e.target.newCourse.value
					this.props.fetchAddCourseSubmit( courseName )
					e.target.newCourse.value = '' // reset course input after submit
				}  }>
					<input name='newCourse' type='text' placeholder='New Course...' minlength='4' maxlength='24' />
					<button type='submit'>Add</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	courses: state.courses.items,
	session: state.session
})

const mapDispatchToProps = dispatch => ({
	fetchAddCourseSubmit: courseName => dispatch( fetchAddCourse(courseName) ),
	fetchCourses: () => dispatch ( fetchCourses() )
})


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)