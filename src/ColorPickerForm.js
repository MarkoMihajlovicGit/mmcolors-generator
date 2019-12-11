import React, { useEffect, useState } from 'react';
import useFormState from './hooks/useFormState';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import styles from './styles/ColorPickerFormStyles';

function ColorPickerForm({ paletteIsFull, addNewColor, colors, classes }) {
  const [currentColor, setCurrentColor] = useState('rgb(145,121,242)');
  const [newColorName, setNewColorName, resetForm] = useFormState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorUnique', value =>
      colors.every(({ color }) => color !== currentColor)
    );
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
  }, [colors, currentColor]);

  const updateCurrentColor = newColor => {
    const { r, g, b, a } = newColor.rgb;
    const rgbaColor = `rgba(${r},${g},${b},${a})`;
    setCurrentColor(rgbaColor);
  };

  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    };
    addNewColor(newColor);
    resetForm();
  };

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
      ></ChromePicker>
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          className={classes.colorNameInput}
          value={newColorName}
          variant="filled"
          name="newColorName"
          placeholder="Color Name"
          onChange={setNewColorName}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'this field is required',
            'Color name must be unique',
            'Color already used!'
          ]}
        ></TextValidator>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={paletteIsFull}
          style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
          className={classes.addColor}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default withStyles(styles)(ColorPickerForm);
