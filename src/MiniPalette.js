import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from './styles/MiniPaletteStyles';

class MiniPalette extends PureComponent {
  constructor(props) {
    super();
  }

  deletePalette = e => {
    e.stopPropagation();
    this.props.openDialog(this.props.id);
  };
  render() {
    const { classes, emoji, paletteName, colors, handleClick, id } = this.props;

    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));
    return (
      <div className={classes.root} onClick={() => handleClick(id)}>
        <DeleteForeverIcon
          className={classes.deleteIcon}
          onClick={this.deletePalette}
        ></DeleteForeverIcon>

        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
