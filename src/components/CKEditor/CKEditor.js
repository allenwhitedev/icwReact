import React from 'react'

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
				<textarea name='editor1' id='editor1'></textarea>
				<form onSubmit={ (e) => // create lesson with html from CKEditor 
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

					<form onSubmit={ (e) => // create custom html element that uses alert() to display user-submitted value 
						{
							e.preventDefault()
							let popupLinkText = e.target.popupLinkText.value //
							let popupDisplayText = e.target.popupDisplayText.value

							window.CKEDITOR.instances.editor1.insertHtml( `<p style='text-decoration:underline; cursor: pointer;' class='customPopup' onclick="alert('${popupDisplayText}')">${popupLinkText}</p>` )
							
							// reset popup form
							e.target.popupLinkText.value = ''
							e.target.popupDisplayText.value = ''
						}					
					}>
						<input name='popupLinkText' type='text' placeholder='Text for popup link...' />
						<input name='popupDisplayText' type='text' placeholder='Text displayed in the popup...' />
						<button type='submit'>Add popup</button>
					</form>
					
			</div>
		)
	}

}