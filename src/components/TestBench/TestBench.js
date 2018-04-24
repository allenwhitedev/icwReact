import React from 'react'
import { connect } from 'react-redux'

const TestBench = () => 
(
	<div className='TestBench'>
		<h2>TestBench Component</h2>
	</div>
)

export default connect()(TestBench)