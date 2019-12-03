import useLocalStorageState from './useLocalStorageState';

export default initialPalettes => {
  const [palettes, setPalettes] = useLocalStorageState(
    'palettes',
    initialPalettes
  );

  const findPalette = id => {
    return palettes.find(function(palette) {
      return palette.id === id;
    });
  };

  const deletePalette = id => {
    const updatedPalettes = palettes.filter(palette => palette.id !== id);
    setPalettes(updatedPalettes);
  };

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette]);
  };

  return {
    palettes,
    findPalette: findPalette,
    deletePalette: deletePalette,
    savePalette: savePalette
  };
};
