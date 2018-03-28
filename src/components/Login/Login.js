import React from 'react'
import { connect } from 'react-redux'
import { fetchLogin, fetchSignup } from '../../actions.js'
import './Login.css'

let Login = ({fetchLoginSubmit, fetchSignupSubmit, currentForm, location}) =>
(
	<div className='Login'>
		<img className="mb-4 center-block" src="/images/icw-logo-200x100.png" alt="I/T CS Workshop"/>
		
	  { ( !location || !location.hash || location.hash !== '#signup' ) &&
		  <form className='form-signin text-center' onSubmit={ e =>
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
		  	<h3 className="h3 mb-3 text-center font-weight-normal">Please Sign In</h3>
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
				New to ICW? <a href='#signup' className="font-weight-normal">Register now.</a>
		  </form>
		 }

		<hr></hr>
		{ (location && location.hash && location.hash === '#signup') &&
	    <form className='form-signin text-center' onSubmit={ e =>
	    {
	      e.preventDefault()
	      let email = e.target.email.value.trim()
	      let password = e.target.password.value.trim()

	      if ( email && password )
	      {
	        fetchSignupSubmit(email, password)
	        // reset signup form after successful submission
	        e.target.email.value = ''
	        e.target.password.value = ''
	      }
	      else
	        alert('A valid email & password are required')
	    } }>
		    <h3 className="h3 mb-3 text-center font-weight-normal">Sign up</h3>
				<label htmlFor="inputEmail" className="sr-only">Email address</label>
				<input name='email' type='text' id="inputEmail" className="form-control" placeholder="Email address" autoFocus />
				<label htmlFor="inputPassword" className="sr-only">Password</label>
				<input name='password' type='password' id="inputPassword" className="form-control" placeholder="Password"/>
	      <button className="mb-3 btn btn-lg btn-success btn-block" type='submit'>Sign Up</button>
	      Already have an account? <a href='' className="font-weight-normal">Login.</a>
	    </form>
	  }
	</div>
)

const mapDispatchToProps = dispatch => ({
	fetchLoginSubmit: (email, password) => dispatch( fetchLogin(email, password) ),
	fetchSignupSubmit: (email, password) => dispatch( fetchSignup(email, password) )
})

export default connect( () => ({}), mapDispatchToProps)(Login)
