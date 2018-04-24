import React from 'react'
import { connect } from 'react-redux'

const WorkBench = ({children}) =>
(
	<div className='WorkBench'>
		<h2>Projects</h2>
		{children}
	</div>
)

const mapStateToProps = (state, ownProps) => ({
	children: ownProps.children
})

export default connect(mapStateToProps)(WorkBench)