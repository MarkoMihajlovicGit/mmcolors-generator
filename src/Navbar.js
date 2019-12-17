import React, { useState, useEffect } from 'react';
import useToggle from './hooks/useToggle';

import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';
import 'rc-slider/assets/index.css';
// important!!! import our own Navbar.css/styles after rc-slider styles
import styles from './styles/NavbarStyles';

function Navbar(props) {
  const [format, setFormat] = useState('hex');

  const [open, toggle] = useToggle(false);

  const { level, changeLevel, displaySlider, classes, handleChange } = props;

  useEffect(() => {
    handleChange(format);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format]);

  const handleFormatChange = e => {
    setFormat(e.target.value);
    toggle(true);
  };

  const closeSnackbar = () => {
    toggle(false);
  };

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
          onChange={handleFormatChange}
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
        onClose={closeSnackbar}
        action={[
          <IconButton
            onClick={closeSnackbar}
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
export default withStyles(styles)(Navbar);
