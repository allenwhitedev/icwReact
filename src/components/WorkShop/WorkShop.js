import React from 'react'
import { connect } from 'react-redux'
import { getCourseItemTitleById } from '../../reducers/courses'
import { Link } from 'react-router-dom'
import { setSearch, fetchAssignCourseItem } from '../../actions'
import { getCourseItemIdsByType } from '../../reducers/users'

const WorkShop = ({sessionRole, users, courseItems, search, setSearchSubmit, fetchAssignCourseItemSubmit}) =>
(
	<div className='WorkShop'>

		{/* Display users and allow course items to be assigned if user is 'teacher' */}
		{ sessionRole === 'teacher' && 
	    <ul className='usersList'>
	      { users.map( user => ( 
	        <li key={`${user._id}`}> 
	          <h5 className='userEmail'><b> {user.email}</b></h5>
	          <section className='usersCourseItemsList'>
	          
	          {/* TaskList (Completed - completedCourseItems) */}
	          <span>TaskList (Completed): </span>
	          { user.completedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'lesson').includes(compCourseItem.courseItemId) ).sort((a,b) => (a.completedAt - b.completedAt) ).map( (completedCourseItem, index) => (
	          	<Link to={`/courses/${courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ) ? courseItems.find(courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId : ''}/${completedCourseItem.courseItemId}`} 
	          		key={completedCourseItem.courseItemId}> 
	          		<span className='courseItemsListItem'>{ getCourseItemTitleById(courseItems, completedCourseItem.courseItemId) }{index >= user.completedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'quiz').includes(compCourseItem.courseItemId) ).length - 1 ? null : ','}</span>
	          	</Link>
	          	) ) 
	        	}
	        	<hr />
	        	{/* TaskList (Assigned - assignedcourseItems) */}
	          <span>TaskList (Assigned): </span>
	          { user.assignedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'lesson').includes(compCourseItem.courseItemId) ).sort((a,b) => (a.assignedAt - b.assignedAt) ).map( (completedCourseItem, index) => (
	          	<Link to={`/courses/${courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ) ? courseItems.find(courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId : ''}/${completedCourseItem.courseItemId}`} 
	          		key={completedCourseItem.courseItemId}> 
	          		<span className='courseItemsListItem'>
	          			{ getCourseItemTitleById(courseItems, completedCourseItem.courseItemId) }
	          			{index >= user.assignedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'lesson').includes(compCourseItem.courseItemId) ).length - 1 ? null : ','}
	          		</span>
	          	</Link>
	          	) ) 
	        	}
	        	</section> 
	        	
	        	{/* assign task form */}
	        	<form>
	        		<input name='courseItemSearch' onBlur={ e => { setSearchSubmit(''); e.target.value = '' } } onChange={ e => setSearchSubmit(e.target.value) } placeholder="Add to TaskList..." />
	        		<ul className='courseItemSearchResults'>
	        			{ courseItems.filter( courseItem => courseItem.title.substring(0, search.length) === search && !user.assignedCourseItems.find( assignedCourseItem => assignedCourseItem.courseItemId === courseItem.id) && courseItem.type === 'lesson' ).slice(0,4).map( searchResult => (
	        					<li onMouseDown={ () => fetchAssignCourseItemSubmit(searchResult.id, user._id) } key={searchResult.id}>{searchResult.title}</li>
	        				) )
	        			}
	        		</ul>
	        	</form>
	        </li> 
	        ) ) }
	    </ul> 
		}

	{/* Display list of assigned (non-quiz) course items if student is user*/}
	{ sessionRole === 'student' &&
		<ul>
			<li>Assigned course items (non-quiz) will be enumerated in a list here for students.</li>
		</ul>
	}

	</div>
)

const mapStateToProps = (state, ownProps) => ({
	sessionRole: state.session.role,
	users: state.entities.users.allIds.map( id => state.entities.users.byId[id] ),
	courseItems: ownProps.courseItems,
	search: state.ui.search
})

const mapDispatchToProps = dispatch => ({
	setSearchSubmit: search => dispatch( setSearch(search) ),
	fetchAssignCourseItemSubmit: (courseItemId, userId) => dispatch( fetchAssignCourseItem(courseItemId, userId) )
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkShop)