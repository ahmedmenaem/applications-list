import React, { Component } from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { RouteComponentProps } from '@reach/router'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import Application from '../components/Application'
import Card from '@material-ui/core/Card'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import NewAppModal from '../components/ApplicationModal'
import CardHeader from '@material-ui/core/CardHeader'
import api from '../utils/api'
import App from '../models/app.model'
import { navigate } from '@reach/router'

interface Props {
  classes: {
    root: string
    demo: string
    title: string
    fabButton: string
  }
}

interface State {
  dense: boolean
  open: boolean
  applications: App[]
}

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: '90%',
      margin: '0 auto',
      marginTop: '70px',
    },
    demo: {
      backgroundColor: palette.background.paper,
    },
    title: {
      margin: `${spacing.unit * 4}px 0 ${spacing.unit * 2}px`,
    },
    fabButton: {
      position: 'fixed',
      zIndex: 1,
      bottom: '10px',
      right: '10px',
    },
  })

class ApplicationsList extends Component<Props & RouteComponentProps, State> {
  public state = {
    dense: false,
    open: false,
    applications: [],
  }

  public async componentDidMount() {
    const applications: Array<App> = await api.list()
    this.setState({ applications: applications })
  }

  public handleApplicationClick = (id: string) => navigate(`/${id}`)

  public handleSaveButtonClick = async (name: string) => {
    const id: string = name
      .trim()
      .split(' ')
      .join('-')
    const app: App = await api.create(id, name)
    this.setState(({ applications }) => {
      applications.push(app)
      return {
        applications,
      }
    })
  }

  public handleDeleteButtonClick = async (id: string) => {
    const resposnse: any = await api.delete(id)
    this.setState(({ applications }) => {
      applications = applications.filter(application => id !== application.id)
      return {
        applications,
      }
    })
  }

  public toggleModal = () => this.setState({ open: !this.state.open })

  public render() {
    const { dense, applications } = this.state
    const { classes } = this.props
    return (
      <Grid item xs={12} md={12}>
        <Card className={classes.root}>
          <CardHeader title="Applications" />
          <div className={classes.demo}>
            <List dense={dense}>
              {applications.length > 0
                ? applications.map((app: App) => (
                    <Application
                      handleDeleteButtonClick={this.handleDeleteButtonClick}
                      key={app.id}
                      app={app}
                      handleApplicationClick={this.handleApplicationClick}
                    />
                  ))
                : null}
            </List>
          </div>
          <Fab
            onClick={this.toggleModal}
            color="secondary"
            aria-label="Add"
            className={classes.fabButton}
          >
            <AddIcon />
          </Fab>
        </Card>
        <NewAppModal
          open={this.state.open}
          toggleModal={this.toggleModal}
          handleSaveButtonClick={this.handleSaveButtonClick}
        />
      </Grid>
    )
  }
}

export default withStyles(styles)(ApplicationsList)
