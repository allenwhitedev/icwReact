import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App/App.js';
import Login from './components/Login/Login.js'
import CourseItem from './components/CourseItem/CourseItem'
import rootReducer from './reducers'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux' // provide access to state across all components/containers
import thunkMiddleware from 'redux-thunk' // use for async actions
import { BrowserRouter, Route, Redirect } from 'react-router-dom'


// Import Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = createStore( rootReducer, applyMiddleware( thunkMiddleware ) )

ReactDOM.render(
	<Provider store={ store }>
		<BrowserRouter>
			<div className='BrowserRouterWrapper'>
				{ ( !store.getState().session.expiresAt || !store.getState().session.expiresAt > Date.now() ) && // temporary redirect to login if user session is not defined
					<Redirect to='/login' />	
				}
				<Route component={Login} path='/login' />
				<Route component={ store.getState().session.expiresAt && store.getState().session.expiresAt > Date.now() ? App : null} exact path='/:currentComponent?' />
				<Route component={App} exact path='/courses/:courseId' />
				<Route component={App} path='/courses/:courseId/:courseItemId' />
				<Route component={CourseItem} path='/courses/:courseId/:courseItemId' />
			</div>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();

