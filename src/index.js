import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App/App.js';
import rootReducer from './reducers.js'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux' // provide access to state across all components/containers
import thunkMiddleware from 'redux-thunk' // use for async actions
import { BrowserRouter, Route } from 'react-router-dom'

const store = createStore( rootReducer, applyMiddleware( thunkMiddleware ) )

ReactDOM.render(
	<Provider store={ store }>
		<BrowserRouter>
			<div className='BrowserRouterWrapper'>
				<Route component={App} exact path='/:currentComponent?' />
				<Route component={App} path='/courses/:courseName' />
			</div>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();

const apiUrl = 'http://localhost:8000/api/v1' // apiUrl changes depending on environment (development/production/test)
export default apiUrl