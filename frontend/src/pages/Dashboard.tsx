import React, { Component, Fragment } from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import TopBar from '../components/TopBar';
import ApplicationList from './ApplicationsList';
import ApplicationDetails from './ApplicationDetails';

class DashboardPage extends React.Component<RouteComponentProps> {
	public render() {
		return (
			<Fragment>
				<TopBar />
				<ApplicationList path="" />
				<ApplicationDetails path="/apps/:id" />
			</Fragment>
		);
	}
}

export default DashboardPage;
