import React from 'react'
import './CKEditor.css'

export default class CKEditor extends React.Component {

	componentDidMount()
	{
		if ( window && window.CKEDITOR )
		{
			window.CKEDITOR.replace( 'editor1' )
			window.CKEDITOR.config.mathJaxLib = '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML'
			window.CKEDITOR.config.allowedContent = true // allows insertHtml() to add html attributes (including onclick=) for custom popup
			window.CKEDITOR.config.removeFormatAttributes = ''
		}
	} // instantiate advanced html editor, load page if editing a page that already exists

	render()
	{
		return (
			<div className='CKEditor'>
				<form onSubmit={ (e) => // create lesson with html from CKEditor
					{
						e.preventDefault()
						let title = e.target.title.value
						let content = window.CKEDITOR.instances.editor1.getData()
						let tags = e.target.tags.value

						this.props.fetchAddCourseItemClick({type: 'lesson', title, content}) // (inherited prop from Course)

						window.CKEDITOR.instances.editor1.setData('') // reset advanced html editor
						e.target.title.value = '' // reset lesson title
						e.target.tags.value = '' // reset lesson title
					} }>
					<div className='text-left'>
						<label className='text-left' for='lesson-title'>Title</label>
						<input className='d-block form-control mb-10 mt-10' id='lesson-title' name='title' minLength='1' size='35' placeholder='Java 101' />
						<label className='text-left' for='lesson-title'>Tags</label>
						<input className='d-block form-control mb-10 mt-10' id='lesson-title' name='tags' minLength='1' size='35' placeholder='Object-Oriented Programming, Interfaces, etc.' />
						<textarea name='editor1' id='editor1'></textarea>
						<hr></hr>
						<div className='input-group'>
							<label className='mr-10' for='popup-link-text'>Popup Text Title</label>
							<input className='d-block form-control mb-10 mr-30' name='popup-link-text' id='popup-link-text' type='text' placeholder='Text for popup link...' />
							<label className='mr-10' for='popup-display-text'>Popup Text Body</label>
							<input className='d-block form-control mb-10 mr-10' name='popup-display-text' id='popup-display-text' type='text' placeholder='Text displayed in the popup...' />
							<button className='btn btn-primary' type='submit'>Add popup</button>
						</div>
					</div>
					<hr></hr>
					<button className='btn btn-success mt-10' type='submit'>Submit Lesson</button>
				</form>
			</div>

					// <form onSubmit={ (e) => // create custom html element that uses alert() to display user-submitted value
					// 	{
					// 		e.preventDefault()
					// 		let popupLinkText = e.target.popupLinkText.value //
					// 		let popupDisplayText = e.target.popupDisplayText.value
					//
					// 		window.CKEDITOR.instances.editor1.insertHtml( `<p style='text-decoration:underline; cursor: pointer;' class='customPopup' onclick="alert('${popupDisplayText}')">${popupLinkText}</p>` )
					//
					// 		// reset popup form
					// 		e.target.popupLinkText.value = ''
					// 		e.target.popupDisplayText.value = ''
					// 	}
					// }>
						// </form>
		)
	}

}
