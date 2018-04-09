import React from 'react'
import { connect } from 'react-redux'

const CourseItem = ({courseItem}) =>
(
	<div className='CourseItem' style={ {paddingLeft: '315px', position: 'absolute', left: '0px', top: '100px'} }>
		<h2>{ courseItem.title }</h2>
		<hr />
		<section style={ {padding: '15px'} } className='courseItemContent' dangerouslySetInnerHTML={ {__html: courseItem.content} }></section>
	</div>
)

const mapStateToProps = (state, ownProps) => ({
	courseItem: state.entities.courseItems.byId[ownProps.match.params.courseItemId]
})

export default connect(mapStateToProps)(CourseItem)