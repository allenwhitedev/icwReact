import React from 'react'
import { connect } from 'react-redux'
import { fetchLogin } from '../../actions.js'

let Login = ({fetchLoginSubmit}) =>
(
	<div className='Login'>
		<img className="mb-4" src="/images/icw-logo-200x100.png" alt="I/T CS Workshop"/>
		<h3 className="h3 mb-3 font-weight-normal">Please sign in</h3>
	  <form className='form-signin' onSubmit={ e =>
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
			<label htmlFor="inputEmail" className="sr-only">Email address</label>
	    <input name='email' type='text' id="inputEmail" className="form-control" placeholder="Email address" autoFocus />
			<label htmlFor="inputPassword" className="sr-only">Password</label>
	    <input name='password' type='password' id="inputPassword" className="form-control" placeholder="Password"/>
			<div className="checkbox mb-3">
        <label htmlFor="remember-me">
          <input type="checkbox" value="remember-me" id="remember-me" /> Remember me
        </label>
      </div>
	    <button className="mb-3 btn btn-lg btn-success btn-block" type='submit'>Sign in</button>
			New to ICW? <a className="font-weight-normal" href="/login">Register now.</a>
	  </form>
	</div>
)

const mapDispatchToProps = dispatch => ({
	fetchLoginSubmit: (email, password) => dispatch( fetchLogin(email, password) )
})

export default connect( () => ({}), mapDispatchToProps)(Login)
