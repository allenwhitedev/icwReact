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

				<NavLink to='/'>
					<img src='/images/icw-logo-128x90.png' alt='ICW logo'/>
				</NavLink>
				
				<h4>{!this.props.courseId || this.props.courseId === '' ? 'Projects' : ''}</h4>

				{this.props.children}
				
				{ this.props.session.role === 'teacher' && // do not allow students to create courses
					<form onSubmit={ e =>
					{
						e.preventDefault()

						let courseName = e.target.newCourse.value
						this.props.fetchAddCourseSubmit( courseName )
						e.target.newCourse.value = '' // reset course input after submit
					}  }>
						<input name='newCourse' type='text' placeholder='New Project...' minLength='4' maxLength='24' />
						<button type='submit'>Add</button>
					</form>
				}	
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	session: state.session,
	courseId: ownProps.courseId
})

const mapDispatchToProps = dispatch => ({
	fetchAddCourseSubmit: courseName => dispatch( fetchAddCourse(courseName) ),
	fetchCourses: () => dispatch ( fetchCourses() )
})


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)