export default {
  up() {},
  down(size) {
    const sizes = {
      xxs: '375px',
      xs: '575.98px',
      s: '767.98px',
      md: '991.98px',
      lg: '1199.98px',
      xl: '1920px'
    };
    return `@media (max-width: ${sizes[size]})`;
  }
};
