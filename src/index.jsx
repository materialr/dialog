import { util } from '@material/dialog';
import Button from '@materialr/button';
import classnames from 'classnames';
import focusTrap from 'focus-trap';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/dialog/mdc-dialog.scss';

import dialogFoundation from './foundation';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classNamesRoot: [],
    };
    this.accept = undefined;
    this.dialogFoundation = undefined;
    this.focusTrap = undefined;
    this.root = undefined;
    this.surface = undefined;
    this.dialogFoundationClose = this.dialogFoundationClose.bind(this);
    this.dialogFoundationCreate = this.dialogFoundationCreate.bind(this);
    this.dialogFoundationDestroy = this.dialogFoundationDestroy.bind(this);
    this.dialogFoundationOpen = this.dialogFoundationOpen.bind(this);
    this.focusTrapCreate = this.focusTrapCreate.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesAsString = this.getClassNamesAsString.bind(this);
    this.getClassNamesBodyAsString = this.getClassNamesBodyAsString.bind(this);
    this.getClassNamesFromProps = this.getClassNamesFromProps.bind(this);
    this.updateClassNamesRoot = this.updateClassNamesRoot.bind(this);
  }
  componentDidMount() {
    this.focusTrapCreate();
    this.dialogFoundationCreate();
    if (this.props.visible) {
      this.dialogFoundationOpen();
    }
  }
  componentWillReceiveProps({ visible }) {
    const { visible: wasVisible } = this.props;
    if (visible && !wasVisible) {
      this.dialogFoundationOpen();
    }
    if (!visible && wasVisible) {
      this.dialogFoundationClose();
    }
  }
  componentWillUnmount() {
    this.dialogFoundationDestroy();
  }
  getClassNames() {
    return this.state.classNamesRoot.join(' ');
  }
  getClassNamesAsString() {
    return `${this.getClassNamesFromProps()} ${this.getClassNames()} ${this.props.className}`
      .trim().replace('  ', ' ');
  }
  getClassNamesBodyAsString() {
    return classnames({
      'mdc-dialog__body': true,
      'mdc-dialog__body--scrollable': this.props.scrollable,
    });
  }
  getClassNamesFromProps() {
    return classnames({
      'mdc-dialog': true,
      'mdc-dialog--theme-dark': this.props.dark,
    });
  }
  dialogFoundationClose() {
    this.dialogFoundation.close();
  }
  dialogFoundationCreate() {
    const { onAccept, onCancel } = this.props;
    this.dialogFoundation = dialogFoundation({
      elementRoot: this.root,
      elementSurface: this.surface,
      focusTrap: this.focusTrap,
      onAccept,
      onCancel,
      updateClassNamesRoot: this.updateClassNamesRoot,
    });
    this.dialogFoundation.init();
  }
  dialogFoundationDestroy() {
    this.dialogFoundation.destroy();
    this.dialogFoundation = undefined;
  }
  dialogFoundationOpen() {
    this.dialogFoundation.open();
  }
  focusTrapCreate() {
    this.focusTrap = util.createFocusTrapInstance(this.surface, this.accept, focusTrap);
  }
  updateClassNamesRoot(classNamesRoot) {
    this.setState({ classNamesRoot });
  }
  render() {
    const { body, labelAccept, labelCancel, rippleCentered, rippleEnabled, title } = this.props;
    return (
      <aside
        aria-describedby="materialr-dialog-description"
        aria-labelledby="materialr-dialog-label"
        className={this.getClassNamesAsString()}
        id="my-mdc-dialog"
        ref={(root) => { this.root = root; }}
        role="alertdialog"
      >
        <div
          className="mdc-dialog__surface"
          ref={(surface) => { this.surface = surface; }}
        >
          <header className="mdc-dialog__header">
            <h2 id="materialr-dialog-label" className="mdc-dialog__header__title">{title}</h2>
          </header>
          <section id="materialr-dialog-description" className={this.getClassNamesBodyAsString()}>
            {body}
          </section>
          <footer className="mdc-dialog__footer">
            <Button
              className="mdc-dialog__footer__button mdc-dialog__footer__button--cancel"
              rippleCentered={rippleCentered}
              rippleEnabled={rippleEnabled}
            >
              {labelCancel}
            </Button>
            <Button
              className="mdc-dialog__footer__button mdc-dialog__footer__button--accept"
              ref={(accept) => { this.accept = accept; }}
              rippleCentered={rippleCentered}
              rippleEnabled={rippleEnabled}
            >
              {labelAccept}
            </Button>
          </footer>
        </div>
        <div className="mdc-dialog__backdrop" />
      </aside>
    );
  }
}

Dialog.propTypes = {
  body: PropTypes.string.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
  labelAccept: PropTypes.string.isRequired,
  labelCancel: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  rippleCentered: PropTypes.bool,
  rippleEnabled: PropTypes.bool,
  scrollable: PropTypes.bool,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};

Dialog.defaultProps = {
  className: '',
  dark: false,
  rippleCentered: false,
  rippleEnabled: false,
  scrollable: false,
  visible: false,
};

export default Dialog;
