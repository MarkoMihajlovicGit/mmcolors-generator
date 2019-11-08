import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';

// important!!! import our own Navbar.css/styles after rc-slider styles
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: 'hex',
      open: false
    };
  }

  handleFormatChange = e => {
    this.setState({ format: e.target.value, open: true }, () => {
      this.props.handleChange(this.state.format);
    });
  };

  closeSnackbar = () => {
    this.setState({ open: false });
  };

  render() {
    const { level, changeLevel, displaySlider, classes } = this.props;
    const { format, open } = this.state;

    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">reactcolorpicker</Link>
        </div>
        {displaySlider && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select
            value={format}
            onChange={this.handleFormatChange}
            className={classes.menuItem}
          >
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          autoHideDuration={2000}
          message={
            <span id="message-id">
              Format Changed to : {format.toUpperCase()} !
            </span>
          }
          ContentProps={{ 'aria-describedby': 'message-id' }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}
export default withStyles(styles)(Navbar);
