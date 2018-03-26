import React from 'react'
import { connect } from 'react-redux'
import { addPost } from '../../actions.js'
import CKEditor from '../CKEditor/CKEditor.js'

let Course = ({courseName, posts, addPostClick}) =>
(
	<div className='Course' style={ {padding: '15px'} }>
		<h2> {courseName} </h2>

		<ul style={ {listStyle: 'none'} }>
			{ posts.map( (post, index) => 
				(
					<li key={index} className='coursePost' dangerouslySetInnerHTML={ {__html: post} } ></li>
				) )
			}
		</ul>

    <CKEditor addPostClick={ addPostClick } />

	</div>
)

const mapStateToProps = (state, ownProps) => ({
	courseName: ownProps.courseName,
	posts: state.posts[ownProps.courseName] ? state.posts[ownProps.courseName] : [] //state.posts.courseName['post one', 'post two']
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	addPostClick: (post) => dispatch( addPost(post, ownProps.courseName) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)