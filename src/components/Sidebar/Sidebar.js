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
		<div>
 			<nav className="sidenav">
    		<ul>
					<NavLink to="/">
						<a href="#0">
							<img src="/img/icw-logo-128x90.png" alt="IT/CS Workshop" />
						</a>
					</NavLink>
       		<li data-toggle="collapse" data-target="#user-options" className="has-children user">
							<img className="avatar" src="/img/cd-avatar.png" alt="avatar" /> First Last
							<ul id="user-options" className="collapse">
								<li>Logout</li>
								<li>Settings</li>
							</ul>
					</li>
					<li className="has-children notifications">
						<a href="#0">Workshop<span className="count">3</span></a>
						<ul>
               <li><a href="#0">Midterm Presentation 2</a></li>
            </ul>
					</li>
					<li className="has-children bookmarks">
						<a href="#0">Courses</a>
						<ul>
               <li><a href="#0">CEN3031: Introduction to Software Engineering</a></li>
               <li><a href="#0">CNT4007C: Computer Network Fundamentals</a></li>
							 <li><a href="#0">CEN4914/CIS4914: CISE Design 2</a></li>
            </ul>
					</li>
        </ul>
 			</nav>
			<div>
				<section className="heading">
					<h1>Dashboard</h1>
					<hr></hr>
				</section>
			</div>
		</div>


			// <div className='Sidebar'>
			// 	<img alt="IT/CS Workshop" src="/images/icw-logo-128x90.png" />
			// 	<ul style={ {listStyle: 'none', textAlign: 'center'} }>
			// 	{
			// 		this.props.courses.map( (course, index) =>
			// 		(
			// 			<li key={index}> <NavLink to={`/courses/${course.name}`}>{course.name}</NavLink> </li>
			// 		) )
			// 	}
			// 	</ul>
			//
			//
			// 	<form onSubmit={ e =>
			// 	{
			// 		e.preventDefault()
			//
			// 		let courseName = e.target.newCourse.value
			// 		this.props.fetchAddCourseSubmit( courseName )
			// 		e.target.newCourse.value = '' // reset course input after submit
			// 	}  }>
			// 		<input name='newCourse' type='text' placeholder='New Course...' minlength='4' maxlength='24' />
			// 		<button type='submit'>Add</button>
			// 	</form>
			// </div>
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
