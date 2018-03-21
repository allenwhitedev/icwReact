import React from 'react'
import { connect } from 'react-redux'
import { addPost } from '../../actions.js'

let Course = ({courseName, posts, addPostClick}) =>
(
	<div className='Course'>
		<h2> {courseName} </h2>

		<ul style={ {listStyle: 'none'} }>
			{ posts.map( (post, index) => 
				(
					<li key={index} className='coursePost' >{post}</li>
				) )
			}
		</ul>

		<h4 className='marginTop100px'>Advanced Editing Widget (currently disabled)</h4>
		<form onSubmit={ e =>
			{
				e.preventDefault()

				let post = e.target.post.value
				addPostClick(post, courseName)

				e.target.post.value = '' // reset add post form
			} } 
			className='submitPostForm'>
	
	    <input name='post' type='text' id="mytextarea" placeholder='Type post content here.' />
           
    </form>


	</div>
)

const mapStateToProps = (state, ownProps) => ({
	courseName: ownProps.courseName,
	posts: state.posts[ownProps.courseName] ? state.posts[ownProps.courseName] : [] //state.posts.courseName['post one', 'post two']
})

const mapDispatchToProps = dispatch => ({
	addPostClick: (post, courseName) => dispatch( addPost(post, courseName) )
})

// function generateHtmlFromPostString(postString)
// {
// 	for ( let i in postString )
// 	{
// 		let popupString = null
// 		let headerString = null
// 		let block = null
// 		if ( i + 3 < postString.length )
// 			block = `${postString[i]}${postString[1]}${postString[i+2]}`
		
// 		if ( block && block === '<p>' && )
// 	}
// }

export default connect(mapStateToProps, mapDispatchToProps)(Course)