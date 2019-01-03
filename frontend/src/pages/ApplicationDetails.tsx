import React, { Component } from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { RouteComponentProps } from '@reach/router'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import VersionModal from '../components/VersionModal'
import CardHeader from '@material-ui/core/CardHeader'
import api from '../utils/api'
import App from '../models/app.model'
import Version from '../components/Version'
import SnackBar from '../components/SnackBar'

interface Props {
  classes: {
    root: string
    demo: string
    title: string
    fabButton: string
  }
}

interface State {
  application: App
  open: boolean
  snakbarOpenState: boolean
  snakbarMessage: string
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

class ApplicationDetails extends Component<
  Props & RouteComponentProps<{ id: string }>
> {
  public state: State = {
    application: {},
    open: false,
    snakbarOpenState: false,
    snakbarMessage: '',
  }

  public async componentDidMount() {
    const { id } = this.props
    const application: App = await api.findOneById(id)
    this.setState({ application: application })
  }

  public toggleModal = () => this.setState({ open: !this.state.open })

  public handleDownloadButtonClick = async (file: string) => {
    if (file !== null && file !== undefined) {
      const response = await api.downloadVersionFile(file)
      let downloadUrl = window.URL.createObjectURL(new Blob([response]))
      const link = document.createElement('a')
      link.href = downloadUrl
      link.target = '_blank'
      link.click()
    } else {
      this.setState({ snakbarOpenState: true })
    }
  }

  public handleSaveButtonClick = async (version: string) => {
    const versionId = version
      .trim()
      .split(' ')
      .join()
    const response: any = await api.createVersion(
      this.state.application.id,
      versionId
    )
    let application = this.state.application
    application.versions[response.id] = response
    this.setState({ application: application })
  }

  public handleCloseSnakBarButton = () => this.setState({ snackBar: false })

  public handleInputFileChange = async (versionId: string, file: any) => {
    const { application } = this.state
    const response = await api.uploadVersionFile(
      application.id,
      versionId,
      file
    )
    application.versions[versionId] = response
    this.setState({ application })
  }

  public render() {
    const { application, open, snakbarOpenState, snakbarMessage } = this.state
    const { classes } = this.props
    return (
      <Grid item xs={12} md={12} className={classes.root}>
        <Card>
          <CardHeader title={application.name} />
          <List dense={false}>
            {application.versions !== undefined && application.versions !== null
              ? Object.keys(application.versions).map(version => (
                  <Version
                    handleDeleteButtonClick={() => {}}
                    key={application.versions[version].id}
                    version={application.versions[version]}
                    handleDownloadButtonClick={this.handleDownloadButtonClick}
                    handleInputFileChange={this.handleInputFileChange}
                  />
                ))
              : null}
          </List>
        </Card>
        <Fab
          onClick={this.toggleModal}
          color="secondary"
          aria-label="Add"
          className={classes.fabButton}
        >
          <AddIcon />
        </Fab>
        <VersionModal
          open={open}
          toggleModal={this.toggleModal}
          handleSaveButtonClick={this.handleSaveButtonClick}
        />
        <SnackBar
          message={snakbarMessage}
          open={snakbarOpenState}
          handleCloseSnakBarButton={this.handleCloseSnakBarButton}
        />
      </Grid>
    )
  }
}

export default withStyles(styles)(ApplicationDetails)
