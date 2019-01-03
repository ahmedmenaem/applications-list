import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'

interface Props {
  classes: {
    close: string
  }
  open: boolean
  message: string
  handleCloseSnakBarButton: any
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    close: {
      padding: spacing.unit / 2,
    },
  })

const BottomLeftSnackBar = ({
  classes,
  open,
  message,
  handleCloseSnakBarButton,
}: Props) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={1000}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{message}</span>}
    action={[
      <Button
        key="undo"
        color="secondary"
        size="small"
        onClick={() => handleCloseSnakBarButton()}
      >
        CLOSE
      </Button>,
    ]}
  />
)

export default withStyles(styles)(BottomLeftSnackBar)
