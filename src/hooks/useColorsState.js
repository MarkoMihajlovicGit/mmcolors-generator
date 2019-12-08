import { useState } from 'react';
import usePaletteState from './usePaletteState';
import useToggle from './useToggle';
import seedColors from '../seedColors';
import arrayMove from 'array-move';

function useColorsState({ history, savePalette }) {
  const { palettes } = usePaletteState(seedColors);
  const [open, setToggle] = useToggle(true);
  const [colors, setColors] = useState(palettes[0].colors);

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
    savePalette(newPalette);
    //redirect
    history.push('/');
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

  return {
    open,
    colors,
    handleDrawerOpen: handleDrawerOpen,
    handleDrawerClose: handleDrawerClose,
    addNewColor: addNewColor,
    handleSubmit: handleSubmit,
    removeColor: removeColor,
    onSortEnd: onSortEnd,
    clearColors: clearColors,
    addRandomColor: addRandomColor
  };
}

export default useColorsState;
// const findPalette = id => {
//   return palettes.find(function(palette) {
//     return palette.id === id;
//   });
// };

// const deletePalette = id => {
//   const updatedPalettes = palettes.filter(palette => palette.id !== id);
//   setPalettes(updatedPalettes);
// };

// const savePalette = newPalette => {
//   setPalettes([...palettes, newPalette]);
// };
