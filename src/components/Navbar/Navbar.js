import React from 'react'
import { connect } from 'react-redux'
import './Navbar.css'
import { setArchitectureLevel } from '../../actions'
import { Link } from 'react-router-dom'

const Navbar = ({architectureLevel, setArchitectureLevelClick}) =>
(
	<nav className='Navbar'>
		<ul className='architectureLevels'>
			<li 
				className={ architectureLevel === 'WorkShop' ? 'activeArchitectureLevel' : 'inactiveArchitectureLevel' }
				onClick={ () => setArchitectureLevelClick('WorkShop') }> 
				<Link style={ {textDecoration: 'none'} } to='/'>WorkShop</Link>
				</li>
			<li className={ architectureLevel === 'WorkBench' ? 'activeArchitectureLevel' : 'blueHover' }
				onClick={ () => setArchitectureLevelClick('WorkBench') }> WorkBench </li>
			<li className={ architectureLevel === 'TestBench' ? 'activeArchitectureLevel' : 'inactiveArchitectureLevel' }
				onClick={ () => setArchitectureLevelClick('TestBench') }> 
				<Link style={ {textDecoration: 'none'} } to='/'>TestBench</Link>
				</li>
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