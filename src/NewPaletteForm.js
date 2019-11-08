import React from 'react';
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

class NewPaletteForm extends React.Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: seedColors[0].colors
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = newColor => {
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ''
    });
  };

  handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors;
    this.props.savePalette(newPalette);
    //redirect
    this.props.history.push('/');
  };

  removeColor = colorName => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  clearColors = () => {
    this.setState({ colors: [] });
  };

  addRandomColor = () => {
    const getColor = () => {
      const randomPaletteIndex = Math.floor(Math.random() * seedColors.length);
      const randomPalette = seedColors[randomPaletteIndex];
      const randomColorIndex = Math.floor(
        Math.random() * randomPalette.colors.length
      );
      return randomPalette.colors[randomColorIndex];
    };

    const validateColor = color => {
      const colors = this.state.colors;
      while (colors.includes(color)) {
        console.log('Found DUPLICATE : ', color);
        color = getColor();
        console.log('NEW COLOR IS: ', color);
      }
      return color;
    };
    const validatedColor = validateColor(getColor());
    this.setState({ colors: [...this.state.colors, validatedColor] });
  };

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
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
            <IconButton onClick={this.handleDrawerClose}>
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
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
                disabled={paletteIsFull}
                className={classes.button}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
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
            removeColor={this.removeColor}
            onSortEnd={this.onSortEnd}
            axis="xy"
            distance={20}
          ></DraggableColorList>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
