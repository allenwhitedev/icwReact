import React from 'react'

export default class CKEditor extends React.Component {

	componentDidMount() { window.CKEDITOR.replace( 'editor1' ) } // instantiate advanced html editor, load page if editing a page that already exists 

	render()
	{
		return (
			<div className='CKEditor'>
				<textarea name='editor1' id='editor1'></textarea>
				<form onSubmit={ (e) => 
					{
						e.preventDefault()
						let title = e.target.title.value
						let content = window.CKEDITOR.instances.editor1.getData()
						
						this.props.fetchAddCourseItemClick({type: 'lesson', title, content}) // (inherited prop from Course)
						
						window.CKEDITOR.instances.editor1.setData('') // reset advanced html editor					
						e.target.title.value = '' // reset lesson title
					} }>
					<br />
					<input name='title' minLength='1' placeholder='Lesson Title...' />
					<button type='submit'>Submit Lesson</button>
					</form>
			</div>
		)
	}

}