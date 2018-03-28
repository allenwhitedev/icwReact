import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchCourses, fetchAddCourse, addCourse} from '../../actions.js'
import './Sidebar.css'

class Sidebar extends React.Component 
{ 
	//({courses, courseName}) 
	componentDidMount()
	{
		if ( this.props.session.expiresAt && this.props.session.expiresAt > Date.now() ) // fetch courses when component mounts if session is not expired
			this.props.fetchCourses(this.props.session.sessionId, this.props.session.userId)
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
					this.props.addCourseSubmit( courseName )
					e.target.newCourse.value = '' // reset course input after submit
				}  }>
					<input name='newCourse' type='text' />
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
	addCourseSubmit: courseName => dispatch( fetchAddCourse(courseName) ),
	fetchCourses: (sessionId, userId) => dispatch ( fetchCourses(sessionId, userId) ),
	addCourseSubmit: (name) => dispatch( addCourse(name) ) // temporary, used for demo
})


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)