import React from 'react'
import { connect } from 'react-redux'
import './Navbar.css'
import { setArchitectureLevel } from '../../actions'

const Navbar = ({architectureLevel, setArchitectureLevelClick}) =>
(
	<nav className='Navbar'>
		<ul className='architectureLevels'>
			<li 
				className={ architectureLevel === 'Workshop' ? 'activeArchitectureLevel' : '' }
				onClick={ () => setArchitectureLevelClick('Workshop') }> Workshop </li>
			<li className={ architectureLevel === 'Workbench' ? 'activeArchitectureLevel' : '' }
				onClick={ () => setArchitectureLevelClick('Workbench') }> Workbench </li>
			<li className={ architectureLevel === 'Testbench' ? 'activeArchitectureLevel' : '' }
				onClick={ () => setArchitectureLevelClick('Testbench') }> Testbench </li>
		</ul>
		<select defaultValue='Mentor' onChange={e => console.log('tba popup mentor courseItem', e.target.value)}>
			<option>Mentor</option>
			<option>Option 1</option>
			<option>Option 2</option>
			<option>Option 3</option>
		</select>
	</nav>
)

const mapStateToProps = state => ({
	architectureLevel: state.ui.architectureLevel
})

const mapDispatchToProps = dispatch => ({
	setArchitectureLevelClick: architectureLevel => dispatch( setArchitectureLevel(architectureLevel) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)