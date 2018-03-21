import React from 'react'
import { connect } from 'react-redux'
import { fetchTests } from '../../actions.js'

let Test = ({tests, fetchTestsClick}) =>
(
	<div className='Test'>
		<h3>Test Component/Container</h3>

		<ul style={ {'listStyle': 'none'} }>
			{ tests.map( (test, index) => 
				(
					<li key={index}> {test.message} </li>
				)) }
		</ul>

		<button onClick={ () => fetchTestsClick() }> Fetch Tests </button>
	</div>
) 

const mapStateToProps = state => ({
	tests: state.tests.items
})

const mapDispatchToProps = dispatch => ({
	fetchTestsClick: () => dispatch( fetchTests() )
})

export default connect(mapStateToProps, mapDispatchToProps)(Test) 
