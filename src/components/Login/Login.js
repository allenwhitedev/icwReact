import React from 'react'
import { connect } from 'react-redux'
import { fetchLogin } from '../../actions.js'

let Login = ({fetchLoginSubmit}) =>
(
	<div className='Login'>
	  <h3>Login Form</h3>
	  <form onSubmit={ e =>
	  {
	    e.preventDefault()

	    let email = e.target.email.value.trim()
	    let password = e.target.password.value.trim()

	    if ( email && password )
	    {
	      fetchLoginSubmit(email, password)

	      // reset login form after successful submission
	      e.target.email.value = ''
	      e.target.password.value = ''
	    }
	    else
	      alert('A valid email & password are required')
	  } }>

	    <input name='email' type='text' />
	    <input name='password' type='password' />

	    <button type='submit'>Login</button>
	  </form>
	</div>
)


const mapDispatchToProps = dispatch => ({
	fetchLoginSubmit: (email, password) => dispatch( fetchLogin(email, password) )
})

export default connect( () => ({}), mapDispatchToProps)(Login)