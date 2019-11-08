import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };

  render() {
    const {
      name,
      background,
      moreUrl,
      showingFullPalette,
      classes
    } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
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
}

export default withStyles(styles)(ColorBox);
