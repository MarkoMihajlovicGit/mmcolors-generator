import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/SingleColorPaletteStyles';

function SingleColorPalette({ palette, colorId, classes }) {
  const [format, setFormat] = useState('hex');

  const gatherShades = (palette, colorToFilterBy) => {
    //return all shades of given color
    let shades = [];

    let allColors = palette.colors;
    for (let color in allColors) {
      shades = shades.concat(
        allColors[color].filter(color => color.id === colorToFilterBy)
      );
    }

    return shades.slice(1);
  };
  const _shades = gatherShades(palette, colorId);

  const changeFormat = val => {
    setFormat(val);
  };

  const { paletteName, emoji, id } = palette;

  const colorBoxes = _shades.map(shade => (
    <ColorBox
      key={shade.name}
      name={shade.name}
      background={shade[format]}
      showingFullPalette={false}
    ></ColorBox>
  ));
  return (
    <div className={classes.Palette}>
      <Navbar handleChange={changeFormat} displaySlider={false}></Navbar>

      <div className={classes.PaletteColors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>GO BACK</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji}></PaletteFooter>
    </div>
  );
}

export default withStyles(styles)(SingleColorPalette);
