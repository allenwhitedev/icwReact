import React from 'react'
import { connect } from 'react-redux'
import { getCourseItemTitleById } from '../../reducers/courses'
import { Link } from 'react-router-dom'
import { setSearch, fetchAssignCourseItem } from '../../actions'
import { getCourseItemIdsByType, getGradeColor } from '../../reducers/users'

const TestBench = ({sessionRole, users, courseItems, search, currentUser, courses, setSearchSubmit, fetchAssignCourseItemSubmit}) =>
(
	<div className='TestBench'>

		{/* Display users and allow course items to be assigned if user is 'teacher' */}
		{ sessionRole === 'teacher' && 
	    <ul className='usersList'>
	      { users.map( user => ( 
	        <li key={`${user._id}`}> 
	          <h5 className='userEmail'><b> {user.email}</b></h5>
	          <section className='usersCourseItemsList'>
	          
	          {/* TestList (Completed - completedCourseItems) */}
	          <span>TestList (Completed): </span>
	          { user.completedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'quiz').includes(compCourseItem.courseItemId) ).sort((a,b) => (a.completedAt - b.completedAt) ).map( (completedCourseItem, index) => (
	          	<Link to={`/courses/${courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ) ? courseItems.find(courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId : ''}/${completedCourseItem.courseItemId}`} 
	          		key={completedCourseItem.courseItemId}> 
	          		<span className='courseItemsListItem'>
	          			{ getCourseItemTitleById(courseItems, completedCourseItem.courseItemId) }
	          			<span style={ {color: getGradeColor(completedCourseItem.grade)}  }> {completedCourseItem.grade * 100}%</span>
	          			{index >= user.completedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'quiz').includes(compCourseItem.courseItemId) ).length - 1 ? null : ','}
	          		</span>
	          	</Link>
	          	) ) 
	        	}
	        	<hr />
	        	{/* TestList (Assigned - assignedcourseItems) */}
	          <span>TestList (Assigned): </span>
	          { user.assignedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'quiz').includes(compCourseItem.courseItemId) ).sort((a,b) => (a.assignedAt - b.assignedAt) ).map( (completedCourseItem, index) => (
	          	<Link to={`/courses/${courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ) ? courseItems.find(courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId : ''}/${completedCourseItem.courseItemId}`} 
	          		key={completedCourseItem.courseItemId}> 
	          		<span className='courseItemsListItem'>
	          			{ getCourseItemTitleById(courseItems, completedCourseItem.courseItemId) }
	          			{index >= user.assignedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'quiz').includes(compCourseItem.courseItemId) ).length - 1 ? null : ','}
	          		</span>
	          	</Link>
	          	) ) 
	        	}
	        	</section> 
	        	
	        	{/* assign task (to TestList) form */}
	        	<form>
	        		<input name='courseItemSearch' onBlur={ e => { setSearchSubmit(''); e.target.value = '' } } onChange={ e => setSearchSubmit(e.target.value) } placeholder="Add to TestList..." />
	        		<ul className='courseItemSearchResults'>
	        			{ courseItems.filter( courseItem => courseItem.title.substring(0, search.length) === search && !user.assignedCourseItems.find( assignedCourseItem => assignedCourseItem.courseItemId === courseItem.id) && courseItem.type === 'quiz' ).slice(0,4).map( searchResult => (
	        					<li onMouseDown={ () => fetchAssignCourseItemSubmit(searchResult.id, user._id) } key={searchResult.id}>{searchResult.title}</li>
	        				) )
	        			}
	        		</ul>
	        	</form>
	        </li> 
	        ) ) }
	    </ul> 
		}

	{/* Display list of assigned (quiz) course items if student is user */}
	{ sessionRole === 'student' &&
		<section className='studentTestBench'>
			
			<ul style={ {listStyle: 'none'} }> {/* TestList */}
				<h3>TestList</h3>
		    { currentUser.assignedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'quiz').includes(compCourseItem.courseItemId) ).sort((a,b) => (a.assignedAt - b.assignedAt) ).map( (completedCourseItem, index) => (
		    	<li className='card margin5px' key={completedCourseItem.courseItemId}>
		    		<h4> Project: &nbsp; 
		    			<Link to={`/courses/${courses.byId[courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId] ?  courses.byId[courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId]._id : ''}`}>
		    				{ courses.byId[courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId].name }
		    			</Link>
		    		</h4>

		    		Assignment:
			    	<Link to={`/courses/${courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ) ? courseItems.find(courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId : ''}/${completedCourseItem.courseItemId}`} > 
			    		<span className='courseItemsListItem'>
			    			 { getCourseItemTitleById(courseItems, completedCourseItem.courseItemId) }
			    		</span>
			    	</Link>
		    	</li>
		    	) ) 
		  	}
			</ul>
			
			<ul style={ {listStyle: 'none'} }> {/* Completed Quizzes */}
				<h3>Completed Quizzes</h3>
		    { currentUser.completedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'quiz').includes(compCourseItem.courseItemId) ).sort((a,b) => (a.completedAt - b.completedAt) ).map( (completedCourseItem, index) => (
		    	<li className='card margin5px' key={completedCourseItem.courseItemId}>
		    		<h4> Project: &nbsp; 
		    			<Link to={`/courses/${courses.byId[courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId] ?  courses.byId[courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId]._id : ''}`}>
		    				{ courses.byId[courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId].name }
		    			</Link>
		    		</h4>

		    		Assignment:
			    	<Link to={`/courses/${courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ) ? courseItems.find(courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId : ''}/${completedCourseItem.courseItemId}`} > 
			    		<span className='courseItemsListItem'>
			    			 { getCourseItemTitleById(courseItems, completedCourseItem.courseItemId) }
			    		</span>
			    	</Link>

			    	<h6>Grade: <span style={ {color: getGradeColor(completedCourseItem.grade)} }>{ completedCourseItem.grade * 100 }%</span></h6>
		    	</li>
		    	) ) 
		  	}
			</ul>

			<ul style={ {listStyle: 'none'} }> {/* Completed Tasks (Non-quiz courseItems) */}
				<h3>Completed Tasks</h3>
		    { currentUser.completedCourseItems.filter( compCourseItem => getCourseItemIdsByType(courseItems, 'lesson').includes(compCourseItem.courseItemId) ).sort((a,b) => (a.completedAt - b.completedAt) ).map( (completedCourseItem, index) => (
		    	<li className='card margin5px' key={completedCourseItem.courseItemId}>
		    		<h4> Project: &nbsp; 
		    			<Link to={`/courses/${courses.byId[courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId] ?  courses.byId[courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId]._id : ''}`}>
		    				{ courses.byId[courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId].name }
		    			</Link>
		    		</h4>

		    		Assignment:
			    	<Link to={`/courses/${courseItems.find( courseItem => courseItem.id === completedCourseItem.courseItemId ) ? courseItems.find(courseItem => courseItem.id === completedCourseItem.courseItemId ).courseId : ''}/${completedCourseItem.courseItemId}`} > 
			    		<span className='courseItemsListItem'>
			    			 { getCourseItemTitleById(courseItems, completedCourseItem.courseItemId) }
			    		</span>
			    	</Link>

		    	</li>
		    	) ) 
		  	}
			</ul>


		</section>
	}

	</div>
)

const mapStateToProps = (state, ownProps) => ({
	sessionRole: state.session.role,
	users: state.entities.users.allIds.map( id => state.entities.users.byId[id] ),
	courseItems: ownProps.courseItems,
	search: state.ui.search,
	currentUser: state.entities.users.byId[state.session.userId],
	courses: state.entities.courses
})

const mapDispatchToProps = dispatch => ({
	setSearchSubmit: search => dispatch( setSearch(search) ),
	fetchAssignCourseItemSubmit: (courseItemId, userId) => dispatch( fetchAssignCourseItem(courseItemId, userId) )
})

export default connect(mapStateToProps, mapDispatchToProps)(TestBench)