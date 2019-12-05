import React, { useState } from 'react';
import useToggle from './hooks/useToggle';
import classNames from 'classnames';
import arrayMove from 'array-move';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import DraggableColorList from './DraggableColorList';
import seedColors from './seedColors';
import styles from './styles/NewPaletteFormStyles';

function NewPaletteForm(props) {
  const maxColors = 20;
  const handleDrawerOpen = () => {
    setToggle({ open: true });
  };

  const handleDrawerClose = () => {
    setToggle({ open: false });
  };

  const addNewColor = newColor => {
    setColors([...colors, newColor]);
  };

  const handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = colors;
    props.savePalette(newPalette);
    //redirect
    props.history.push('/');
  };

  const removeColor = colorName => {
    setColors(colors.filter(color => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const movedColors = arrayMove(colors, oldIndex, newIndex);
    setColors(movedColors);
  };

  const clearColors = () => {
    setColors([]);
  };
  const addRandomColor = () => {
    const getColor = () => {
      const randomPaletteIndex = Math.floor(Math.random() * seedColors.length);
      const randomPalette = seedColors[randomPaletteIndex];
      const randomColorIndex = Math.floor(
        Math.random() * randomPalette.colors.length
      );
      return randomPalette.colors[randomColorIndex];
    };

    const validateColor = color => {
      const colorsToCheck = colors;
      while (colorsToCheck.includes(color)) {
        console.log('Found DUPLICATE : ', color);
        color = getColor();
        console.log('NEW COLOR IS: ', color);
      }
      return color;
    };
    const validatedColor = validateColor(getColor());
    setColors([...colors, validatedColor]);
  };

  const { classes, palettes } = props;
  const [open, setToggle] = useToggle(true);
  const [colors, setColors] = useState(seedColors[0].colors);
  const paletteIsFull = colors.length >= maxColors;
  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      ></PaletteFormNav>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          ></ColorPickerForm>
        </div>
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          onSortEnd={onSortEnd}
          axis="xy"
          distance={20}
        ></DraggableColorList>
      </main>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
