import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchCourses, fetchAddCourse, fetchLogout } from '../../actions.js'
import './Sidebar.css'
import $ from 'jquery'

class Sidebar extends React.Component
{
	componentDidMount()
	{
		if ( this.props.session.expiresAt && this.props.session.expiresAt > Date.now() ) { // fetch courses when component mounts if session is not expired
			this.props.fetchCourses()
		}

		$(".user.dropdown-btn").click(function(){
			$(".user.dropdown-container").toggle(300);
		});

		$(".workshop.dropdown-btn").click(function(){
			$(".workshop.dropdown-container").toggle(300);
		});

		$(".courses.dropdown-btn").click(function(){
			$(".courses.dropdown-container").toggle(300);
		});

	}

	render()
	{
		return (
		<div>
 			<nav className="sidenav">
    		<ul>

					<NavLink className="text-center logo" to="/">
						<img src="/img/icw-logo-128x90.png" alt="IT/CS Workshop" />
					</NavLink>

       		<li className="user dropdown-btn">
							<span className="fa fa-3x fa-user-circle"></span><span className="user-span">First Last</span>
					</li>
					<ul className="user dropdown-container" id="user-options">
						{ this.props.session.sessionId &&
						<li><a href="#" onClick={ () => this.props.fetchLogoutClick(this.props.session.sessionId, this.props.session.userId) }><span className="fa fa-sign-out"></span> Logout</a></li>
						}
						<li><a href="#"><span className="fa fa-cog"></span> Settings</a></li>
					</ul>

					<hr></hr>

					<li className="workshop dropdown-btn notifications">
						<div><span className="fa fa-pencil"></span> Workshop<span className="count">1</span></div>
					</li>
					<ul className="workshop dropdown-container">
             <li><NavLink to="#">Midterm Presentation 2</NavLink></li>
          </ul>

					<li className="courses dropdown-btn bookmarks">
						<div><span className="fa fa-book"></span> Courses</div>
					</li>
					<ul className="courses dropdown-container">
						{ this.props.courses.map( (course, index) => ( <li key={index}> <NavLink to={`/courses/${course.name}`}>{course.name}</NavLink> </li> ) ) }
          </ul>

        </ul>
 			</nav>
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
	fetchAddCourseSubmit: (courseName) => dispatch( fetchAddCourse(courseName) ),
	fetchCourses: () => dispatch ( fetchCourses() ),
	fetchLogoutClick: (sessionId, userId) => dispatch( fetchLogout(sessionId, userId) )
})


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
