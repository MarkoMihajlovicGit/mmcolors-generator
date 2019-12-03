import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: ''
    };
    this.goToPalette = this.goToPalette.bind(this);
  }

  openDialog = id => {
    this.setState({ openDeleteDialog: true, deletingId: id });
  };
  closeDialog = () => {
    this.setState({ openDeleteDialog: false, deletingId: '' });
  };

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  handleDelete = () => {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  };

  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog } = this.state;

    return (
      <>
        <div className={classes.root}>
          <div className={classes.container}>
            <nav className={classes.nav}>
              <h1 className={classes.heading}>React Colors</h1>
              {/* create new pallete goes here */}
              <Link to="/palette/new">Create Palette</Link>
            </nav>

            <TransitionGroup className={classes.palettes}>
              {palettes.map(palette => (
                <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                  <MiniPalette
                    {...palette}
                    key={palette.id}
                    id={palette.id}
                    handleClick={this.goToPalette}
                    openDialog={this.openDialog}
                  ></MiniPalette>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
          <Dialog
            open={openDeleteDialog}
            aria-labelledby="delete-dialog-title"
            onClose={this.closeDialog}
          >
            <DialogTitle id="delete-dialog-title">
              Delete This Palette
            </DialogTitle>
            <List>
              <ListItem button onClick={this.handleDelete}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: blue[100], color: blue[600] }}
                  >
                    <CheckIcon></CheckIcon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Delete</ListItemText>
              </ListItem>
              <ListItem button onClick={this.closeDialog}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: red[100], color: red[600] }}
                  >
                    <ClearIcon></ClearIcon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Cancel</ListItemText>
              </ListItem>
            </List>
          </Dialog>
        </div>
        <footer className={classes.footer}>
          <span>
            Adapted by{' '}
            <a
              href="https://github.com/MarkoMihajlovicGit"
              rel="noopener noreferrer"
              target="_blank"
            >
              Marko Mihajlovic
            </a>{' '}
            |{' '}
            <a
              href="https://github.com/MarkoMihajlovicGit/mmcolors-generator"
              rel="noopener noreferrer"
              target="_blank"
            >
              Source code
            </a>
          </span>
        </footer>
      </>
    );
  }
}

export default withStyles(styles)(PaletteList);
