import sizes from './sizes';

export default {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh'
  },

  logo: {
    marginRight: 15,
    padding: '0 13px',
    fontSize: 22,
    backgroundColor: '#eceff1',
    fontFamily: 'Roboto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: 'black'
    },
    [sizes.down('xs')]: {
      display: 'none'
    }
  },

  slider: {
    width: 340,
    margin: '0 10px',
    display: 'inline-block',
    '& .rc-slider-rail': {
      height: '8px'
    },
    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus': {
      backgroundColor: 'green',
      outline: 'none',
      border: '2px solid green',
      boxShadow: 'none',
      width: 15,
      height: 15,
      marginLeft: '-7px',
      marginTop: '-4px'
    },
    '& .rc-slider-track': {
      backgroundColor: 'transparent'
    },
    [sizes.down('s')]: {
      width: '150px'
    }
  },
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem'
  },
  menuItem: {
    paddingLeft: '0.3rem'
  }
};
