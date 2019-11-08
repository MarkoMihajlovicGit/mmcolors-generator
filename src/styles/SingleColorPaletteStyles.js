import sizes from './sizes';

export default {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },

  PaletteColors: {
    height: '90%'
  },
  goBack: {
    width: '20%',
    height: '50%',
    margin: ' 0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4.8px',
    opacity: 1,
    backgroundColor: 'rgb(2, 2, 2)',
    '& a': {
      color: 'white',
      width: '100px',
      height: '30px',
      position: 'absolute',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      marginLeft: '-50px',
      marginTop: '-15px',
      textAlign: ' center',
      outline: 'none',
      background: 'rgba(255, 255, 255, 0.3)',
      fontSize: '1rem',
      lineHeight: '30px',
      opacity: '1',
      textTransform: 'uppercase',
      border: 'none',
      textDecoration: 'none'
    },
    [sizes.down('lg')]: {
      height: '33.33%',
      width: '25%'
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '20%'
    },

    [sizes.down('xs')]: {
      height: '10%',
      width: '100%'
    }
  }
};
