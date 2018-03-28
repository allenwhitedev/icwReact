import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import {  NavLink } from 'react-router-dom'

import { fetchLogout } from '../../actions.js'
import Test from '../Test/Test.js'
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

        <header>
          <span className='sessionStatus'>{ this.props.session.sessionId ? `Logged in with session id '${this.props.session.sessionId}'` : 'Logged Out' }</span>
          { this.props.session.sessionId &&  // only render logout button if logged in
            <button className='logoutButton' onClick={ () => this.props.session.sessionId ? this.props.dispatch( fetchLogout(this.props.session.sessionId, this.props.session.userId) ) : alert('You are already logged out') }>Logout</button>
          }
          <h1>IT/CS Workshop</h1>
        </header>

        <Sidebar courseName={this.props.params } />

        <main className='main'>
          { this.props.match.path.includes('/courses')  &&
            <Course courseName={ this.props.match.params.courseName } />
          }

          { this.props.match.params.currentComponent === 'test' &&
            <Test />
          }

          <nav className='navLinks'>
            <NavLink to='/test'>Test Page</NavLink>
          </nav>
        </main>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
})

export default connect(mapStateToProps)(App)
