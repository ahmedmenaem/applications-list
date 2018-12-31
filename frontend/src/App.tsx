import React, { Component, Fragment } from 'react';
import './App.css';
import { Router } from '@reach/router';
// import DashboardPage from './pages/Dashboard';
import TopBar from './components/TopBar';
import ApplicationList from './pages/ApplicationsList';
import ApplicationDetails from './pages/ApplicationDetails';

const App = () => (
	<Fragment>
		<TopBar />
		<Router>
			<ApplicationList path="/" />
			<ApplicationDetails path="/:id" />
		</Router>
	</Fragment>
);

export default App;
