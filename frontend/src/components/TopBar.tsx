import React, { Fragment } from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from '@reach/router'

interface Props {
  classes: {
    appBar?: string
    fabButton?: string
    toolbar?: string
    menuButton?: string
    title?: string
    grow?: string
    searchIcon?: string
    search?: string
    inputRoot?: string
    inputInput?: string
    link: string
  }
}

const styles = ({ palette, spacing, shape, transitions, breakpoints }: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: shape.borderRadius,
      backgroundColor: fade(palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [breakpoints.up('sm')]: {
        marginLeft: spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: spacing.unit,
      paddingRight: spacing.unit,
      paddingBottom: spacing.unit,
      paddingLeft: spacing.unit * 10,
      transition: transitions.create('width'),
      width: '100%',
      [breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
    },
  })

const TopBar = ({ classes }: Props) => (
  <Fragment>
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h6"
          color="inherit"
          noWrap
        >
          <Link to="/" className={classes.link}>
            Verge
          </Link>
        </Typography>
        <div className={classes.grow} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  </Fragment>
)

export default withStyles(styles)(TopBar)
