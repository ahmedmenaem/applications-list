import React, { Component } from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import FolderIcon from '@material-ui/icons/Folder'
import VersionModel from '../models/version.model'
import { Button } from '../../node_modules/@material-ui/core'

interface Props {
  version: VersionModel
  handleDeleteButtonClick: any
  handleDownloadButtonClick: any
  handleInputFileChange: any
  classes: {
    button: string
    input: string
  }
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    button: {
      margin: spacing.unit,
    },
    input: {
      display: 'none',
    },
  })

class Version extends Component<Props> {
  input: HTMLInputElement
  public render() {
    const { classes, version, handleInputFileChange } = this.props
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={version.id} />
        <ListItemSecondaryAction>
          <input
            type="file"
            id="upload-file"
            className={classes.input}
            ref={ref => (this.input = ref)}
            onChange={() => {
              handleInputFileChange(version.id, this.input.files[0])
            }}
          />
          <Button
            aria-label="Delete"
            onClick={() => this.input.click()}
            color="primary"
            className={classes.button}
          >
            Upload
          </Button>
          {version.file !== null && version.file !== undefined ? (
            <Button
              color="primary"
              aria-label="Download"
              className={this.props.classes.button}
              onClick={() => {
                this.props.handleDownloadButtonClick(this.props.version.file)
              }}
            >
              Download
            </Button>
          ) : null}
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default withStyles(styles)(Version)
