import React, { memo } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from './styles/MiniPaletteStyles';

const MiniPalette = memo(props => {
  const deletePalette = e => {
    e.stopPropagation();
    props.openDialog(props.id);
  };

  const { classes, emoji, paletteName, colors, handleClick, id } = props;

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
        onClick={deletePalette}
      ></DeleteForeverIcon>

      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
});

export default withStyles(styles)(MiniPalette);
