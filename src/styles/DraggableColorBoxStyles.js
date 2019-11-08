import sizes from './sizes';
import chroma from 'chroma-js';

export default {
  root: {
    width: '20%',
    height: ' 25%',
    margin: ' 0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4.8px',
    '&:hover svg ': {
      color: 'white',
      transform: 'scale(1.3)'
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: '20%'
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%'
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: '5%'
    }
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    padding: 10,
    color: props =>
      chroma(props.color).luminance() <= 0.08 ? 'white' : 'rgba(0, 0, 0, 0.7)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 12,
    display: 'flex',
    justifyContent: 'space-between'
  },
  deleteIcon: {
    transition: 'all 1.5s ease-in-out',
    [sizes.down('xs')]: {
      fontSize: '1.1rem'
    }
  }
};
