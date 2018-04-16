import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import {  NavLink } from 'react-router-dom'

import { fetchSignup, fetchLogout } from '../../actions.js'
import Test from '../Test/Test.js'
import Login from '../Login/Login.js'
import Sidebar from '../Sidebar/Sidebar.js'
import Course from '../Course/Course.js'
import { fetchCompleteCourseItem, fetchUsers } from '../../actions'
import { isCourseItemCompleted } from '../../reducers/users'
import { getCourseItemTitleById } from '../../reducers/courses'

class App extends React.Component {

  componentWillMount()
  {
    if ( this.props.history.location.pathname === '/login' ) // redirect to home page after logging in
    {
      this.props.history.push('/')
      if ( this.props.session.role === 'teacher'  ) // fetch users for home page if user is 'teacher'
        this.props.dispatch( fetchUsers() )
    }
  }

  componentDidMount() // fetches user on home page refresh ( for 'teacher' )
  {
    if ( this.props.session.role === 'teacher' && this.props.match.url === '/' ) // fetch users on home page is user is 'teacher'
      this.props.dispatch( fetchUsers() )
  }

  render() {
    return (
      <div className="App">

          <Sidebar courseName={this.props.params}> {/* Sidebar for home page  */}
            <ul style={ {listStyle: 'none', textAlign: 'left', paddingLeft: '25px'} }>
              <h4> { this.props.courses.find( course => course._id === this.props.match.params.courseId ) ? this.props.courses.find( course => course._id === this.props.match.params.courseId ).name : '' /* this selected should be refactored and moved to matchStateToProps() */ }</h4>

              { (!this.props.match.params.courseId || this.props.match.params.courseId === '') && // Sidebar for home page
                this.props.courses.map( (course, index) => 
                (
                  <li key={index}> <NavLink to={`/courses/${course._id}`}>{course.name}</NavLink> </li>
                ) ) 
              }
              { this.props.match.params.courseId && this.props.match.params.courseId !== '' && // Sidebar for course/courseItem pages
                  this.props.courseItems.map( (courseItem, index) => 
                  (

                    <li key={courseItem.id} onClick={ 
                      () => this.props.session.role === 'student' && !isCourseItemCompleted(this.props.users, courseItem.id, this.props.session.userId) ? this.props.dispatch( fetchCompleteCourseItem(courseItem.id) ) : null /* complete course it if student */ 
                    }> 
                      <NavLink style={ courseItem.id === this.props.match.params.courseItemId ? {color: 'red'} : {} } to={`/courses/${this.props.match.params.courseId}/${courseItem.id}`} >
                        <span style={ courseItem.parentCourseItemId ? {marginLeft: '15px'} : {} }> {courseItem.title} </span> 
                      </NavLink> 
                    </li>
                  ) )
              }
            </ul>
          </Sidebar>          


        <nav className='navLinks'>
          <NavLink to='/test'>Test Page</NavLink>
        </nav>

        <header>
          <span className='sessionStatus'>{ this.props.session.sessionId ? `Logged in with role '${this.props.session.role}'` : 'Logged Out' }</span>
          { this.props.session.sessionId &&  // only render logout button if logged in
            <button className='logoutButton' onClick={ () => this.props.session.sessionId ? this.props.dispatch( fetchLogout(this.props.session.sessionId, this.props.session.userId) ) : alert('You are already logged out') }>Logout</button>
          }
        </header>

        <main className='main'>

          { this.props.match.url === '/' &&
            <section className='homeBanner'>
              <h1>Welcome</h1>
              <h2>This is the home page.</h2>

              { this.props.session.role === 'teacher' && // display all users on home page if user is 'teacher'
                <ul className='usersList'>
                  { this.props.users.allIds.map( userId => ( 
                    <li key={userId}> 
                      <b>{userId}: </b>
                      { this.props.users.byId[userId].completedCourseItems.map( completedCourseItem => `['${ getCourseItemTitleById(this.props.courseItems, completedCourseItem.courseItemId) }', completed: ${new Date(completedCourseItem.completedAt)}]` ) } 
                    </li> 
                    ) ) }
                </ul>            
              }
    
            </section>
          }

          { ( this.props.match.path.includes('/courses') && this.props.location.pathname.match( new RegExp('/', 'g') ).length < 3 )  &&
            <Course courseId={ this.props.match.params.courseId } />
          }

          { this.props.match.params.currentComponent === 'test' &&
            <Test />
          }

          { (!this.props.session.sessionId || this.props.match.params.currentComponent === 'login') &&
            <Login />
          }

          { ( this.props.match.params.currentComponent === 'login' ) &&
            <section className='temporaryWrapper'>

              <h3>Signup Form - Testing Only (ufl.edu emails will be used in future)</h3>

              <form onSubmit={ e =>
              {
                e.preventDefault()
                let email = e.target.email.value.trim()
                let password = e.target.password.value.trim()

                if ( email && password )
                {
                  this.props.dispatch( fetchSignup(email, password) )
                  // reset signup form after successful submission
                  e.target.email.value = ''
                  e.target.password.value = ''
                }
                else
                  alert('A valid email & password are required')
              } }>
                <input name='email' type='text' />
                <input name='password' type='password' />

                <button type='submit'>Sign Up</button>
              </form>
            </section>
          }
        </main>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let courseItems = state.entities.courseItems.allIds.map( id => state.entities.courseItems.byId[id] ).filter( courseItem => courseItem.courseId === ownProps.match.params.courseId ) // grab course items for current course
  let subCourseItems = []
  let orderedCourseItems = [] // ordered to have sub course items right after their parent course item
  for ( let i in courseItems )
  {
    if ( courseItems[i].parentCourseItemId )
      subCourseItems.push( courseItems[i] )
    else
      orderedCourseItems.push( courseItems[i] )    
  }
  if ( ownProps.match.url === '/' ) // get all courseItemIds if on home page (used to display completed course items)
    orderedCourseItems = state.entities.courseItems.allIds.map( id => state.entities.courseItems.byId[id] )

  let parentIndex = -1 // -1 is the not found value of indexOf()
  for ( let i in subCourseItems )
  {
    parentIndex = orderedCourseItems.map( courseItem => courseItem.id ).indexOf(subCourseItems[i].parentCourseItemId)
    if ( parentIndex > -1)
      orderedCourseItems.splice(parentIndex + 1, 0, subCourseItems[i])
  }
  
  return {
    session: state.session,
    courses: state.entities.courses.allIds.map( id => state.entities.courses.byId[id] ),
    courseItems: orderedCourseItems,
    users: state.entities.users
  }
}

export default connect(mapStateToProps)(App)
