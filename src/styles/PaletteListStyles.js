import sizes from './sizes';
import bg from './bg.svg';

export default {
  '@global': {
    '.fade-exit': {
      opacity: 1
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-out'
    }
  },
  root: {
    height: '100vh',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#3a2a7e',

    backgroundImage: `url(${bg})`,
    overflow: 'auto'
  },
  heading: {
    fontSize: '2rem'
  },
  container: {
    width: '65%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: '2rem',
    [sizes.down('xl')]: {
      width: '75%'
    },
    [sizes.down('lg')]: {
      width: '75%'
    }
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    '& a': {
      color: 'white'
    }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2.5rem',
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
      gridGap: '2rem'
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1.5rem'
    }
  }
};
