import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import {  NavLink } from 'react-router-dom'

import { fetchSignup, fetchLogout } from '../../actions.js'
import Test from '../Test/Test.js'
import Login from '../Login/Login.js'
import Sidebar from '../Sidebar/Sidebar.js'
import Course from '../Course/Course.js'

class App extends React.Component {

  componentWillMount()
  {
    if ( this.props.history.location.pathname === '/login' )
      this.props.history.push('/')
  }

  render() {
    return (
      <div className="App">

        <nav className='navLinks'>
          <NavLink to='/test'>Test Page</NavLink>
        </nav>

        <header>
          <span className='sessionStatus'>{ this.props.session.sessionId ? `Logged in with role '${this.props.session.role}'` : 'Logged Out' }</span>
          { this.props.session.sessionId &&  // only render logout button if logged in
            <button className='logoutButton' onClick={ () => this.props.session.sessionId ? this.props.dispatch( fetchLogout(this.props.session.sessionId, this.props.session.userId) ) : alert('You are already logged out') }>Logout</button>
          }
        </header>

        <Sidebar courseName={this.props.params } />

        { this.props.match.url === '/' &&
          <section className='homeBanner'>
            <h1>Welcome</h1>
            <h2>This is the home page.</h2>
          </section>
        }

        <main className='main'>
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

const mapStateToProps = state => ({
  session: state.session
})

export default connect(mapStateToProps)(App)
