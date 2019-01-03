import React, { Component, Fragment } from 'react'
import './App.css'
import { Router } from '@reach/router'
import TopBar from './components/TopBar'
import Loadable from 'react-loadable'
import CircularProgress from '@material-ui/core/CircularProgress'

const ApplicationList = Loadable({
  loader: () => import('./pages/ApplicationsList'),
  loading: () => <CircularProgress />,
})

const ApplicationDetails = Loadable({
  loader: () => import('./pages/ApplicationDetails'),
  loading: () => <CircularProgress />,
})

const App = () => (
  <Fragment>
    <TopBar />
    <Router>
      <ApplicationList path="/" />
      <ApplicationDetails path="/:id" />
    </Router>
  </Fragment>
)

export default App
