import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: 'rgb(226,43,5)',
      newColorName: ''
      // colors: this.props.colors
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
    ValidatorForm.addValidationRule('isColorNameUnique', value => {
      return this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
  }

  updateCurrentColor = newColor => {
    const { r, g, b, a } = newColor.rgb;
    const rgbaColor = `rgba(${r},${g},${b},${a})`;
    this.setState({ currentColor: rgbaColor });
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: '' });
  };

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        ></ChromePicker>
        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            className={classes.colorNameInput}
            value={newColorName}
            variant="filled"
            name="newColorName"
            placeholder="Color Name"
            onChange={this.handleChange}
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
}
export default withStyles(styles)(ColorPickerForm);
