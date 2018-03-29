import React from 'react'
import { connect } from 'react-redux'

const CourseItem = ({courseItem}) =>
(
	<div className='CourseItem'>
		<h2>{ courseItem.title }</h2>
		<hr />
		<section className='courseItemContent' dangerouslySetInnerHTML={ {__html: courseItem.content} }></section>
	</div>
)

const mapStateToProps = (state, ownProps) => ({
	courseItem: state.courseItems.items.find( courseItem => ownProps.match.params.courseItemId === courseItem.id ) ? state.courseItems.items.find( courseItem => ownProps.match.params.courseItemId === courseItem.id ) : {id: 'not defined yet', title: 'not defined yet'}
})

export default connect(mapStateToProps)(CourseItem)