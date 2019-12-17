import React, { useRef } from 'react';
import useToggle from './hooks/useToggle';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';

function ColorBox(props) {
  const [copied, toggle] = useToggle(false);
  // Use a ref to access the current copied value in
  // an async callback.
  const copiedRef = useRef(copied);
  copiedRef.current = copied;

  const changeCopyState = () => {
    toggle();
    setTimeout(() => {
      toggle(copiedRef.current);
    }, 1500);
  };

  const { name, background, moreUrl, showingFullPalette, classes } = props;
  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.colorBox}>
        <div
          className={classNames(classes.copyOverlay, {
            [classes.showOverlay]: copied
          })}
          style={{ background }}
        />
        <div
          className={classNames(classes.copyMsg, {
            [classes.showCopyMsg]: copied
          })}
        >
          <h1>copied!</h1>
          <p className={classes.darkerText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.nameColor}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link to={moreUrl} onClick={e => e.stopPropagation()}>
            <span className={classes.seeMore}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default withStyles(styles)(ColorBox);
