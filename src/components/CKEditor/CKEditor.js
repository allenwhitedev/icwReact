import React from 'react'

export default class CKEditor extends React.Component {

	componentDidMount() { window.CKEDITOR.replace( 'editor1' ) } // instantiate advanced html editor, load page if editing a page that already exists 

	render()
	{
		return (
			<div className='CKEditor'>
				<textarea name='editor1' id='editor1'></textarea>
				<button onClick={ () => 
					{
						let post = window.CKEDITOR.instances.editor1.getData()
						this.props.addPostClick(post) // add post (inherited prop from Course)
						window.CKEDITOR.instances.editor1.setData('') // reset advanced html editor					
					} }>Submit Advanced HTML Editor</button>
			</div>
		)
	}

}