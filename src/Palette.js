import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import styles from './styles/PaletteStyles.js';

function Palette(props) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState('hex');

  const changeLevel = level => {
    setLevel(level);
  };
  const changeFormat = val => {
    setFormat(val);
  };

  const { colors, paletteName, emoji, id } = props.palette;
  const { classes } = props;

  const colorBoxes = colors[level].map(color => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      moreUrl={`/palette/${id}/${color.id}`}
      showingFullPalette
    />
  ));

  return (
    <div className={classes.Palette}>
      {/* {navbar goes here} */}
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeFormat}
        displaySlider={true}
      />
      <div className={classes.PaletteColors}>{colorBoxes}</div>
      {/* footer eventualy */}
      <PaletteFooter paletteName={paletteName} emoji={emoji}></PaletteFooter>
    </div>
  );
}

export default withStyles(styles)(Palette);
