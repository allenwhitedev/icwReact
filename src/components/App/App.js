import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'

import { fetchSignup, fetchLogout } from '../../actions.js'
import Test from '../Test/Test.js'
import Login from '../Login/Login.js'
import Sidebar from '../Sidebar/Sidebar.js'
import Course from '../Course/Course.js'

class App extends React.Component {

  componentDidMount()
  {
    console.log('this.props', this.props)
    console.log('this.props.session', this.props.session)
    console.log('this.props.match.params', this.props.match.params)
    console.log('this.props.match:', this.props.match)
  }

  render() {
    return (
      <div className="App">

        <header>
          <span className='sessionStatus'>{ this.props.session.sessionId ? `Logged in with session id '${this.props.session.sessionId}'` : 'Logged Out' }</span>
          { this.props.session.sessionId &&  // only render logout button if logged in 
            <button className='logoutButton' onClick={ () => this.props.session.sessionId ? alert('You are already logged out') : this.props.dispatch( fetchLogout(this.props.session.sessionId, this.props.session.userId) ) }>Logout</button>
          }
          <h1>IT/CS Workshop</h1>
        </header>

        <Sidebar courseName={this.props.params } />

        { this.props.match.path.includes('/courses')  &&
          <Course courseName={ this.props.match.params.courseName } />
        }

        { this.props.match.params.currentComponent === 'test' &&
          <Test />
        }
        
        { (!this.props.session.sessionId || this.props.match.params.currentComponent === 'login') &&
          <Login />
        }

        <nav className='navLinks'>
          <NavLink to='/test'>Test Page</NavLink>
            &nbsp;
          <NavLink to='/login'>Login</NavLink>
        </nav>

        
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



        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
})

export default connect(mapStateToProps)(App)
