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
						<a className="text-center logo" href="#0">
							<img src="/img/icw-logo-128x90.png" alt="IT/CS Workshop" />
						</a>
					</NavLink>

       		<li className="user dropdown-btn">
							<span className="fa fa-3x fa-user-circle"></span><span className="user-span">First Last</span>
					</li>
					<ul className="user dropdown-container" id="user-options">
						<li><a href="#0"><span className="fa fa-sign-out"></span> Logout</a></li>
						<li><a href="#0"><span className="fa fa-cog"></span> Settings</a></li>
					</ul>

					<hr></hr>

					<li className="workshop dropdown-btn notifications">
						<a href="#0"><span className="fa fa-pencil"></span> Workshop<span className="count">1</span></a>
					</li>
					<ul className="workshop dropdown-container">
             <li><a href="#0">Midterm Presentation 2</a></li>
          </ul>

					<li className="courses dropdown-btn bookmarks">
						<a href="#0"><span className="fa fa-book"></span> Courses</a>
					</li>
					<ul className="courses dropdown-container">
             <li><a href="#0">CEN3031: Introduction to Software Engineering</a></li>
             <li><a href="#0">CNT4007C: Computer Network Fundamentals</a></li>
						 <li><a href="#0">CEN4914/CIS4914: CISE Design 2</a></li>
          </ul>

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
