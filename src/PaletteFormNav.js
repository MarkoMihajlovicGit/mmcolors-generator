import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PaletteMetaForm from './PaletteMetaForm';

import styles from './styles/PaletteFormNavStyles.js';

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formShowing: false
    };
  }

  showForm = () => {
    this.setState({ formShowing: true });
  };
  hideForm = () => {
    this.setState({ formShowing: false });
  };

  render() {
    const {
      classes,
      open,
      handleSubmit,
      handleDrawerOpen,
      palettes
    } = this.props;
    const { formShowing } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
          color="default"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <ChevronRightIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                GO BACK!
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={this.showForm}
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {formShowing && (
          <PaletteMetaForm
            handleSubmit={handleSubmit}
            palettes={palettes}
            hideForm={this.hideForm}
          ></PaletteMetaForm>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
