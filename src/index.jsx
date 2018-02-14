import { util } from '@material/dialog';
import Button from '@materialr/button';
import classnames from 'classnames';
import focusTrap from 'focus-trap';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/dialog/mdc-dialog.scss';

import dialogFoundation from './foundation';

class Dialog extends React.Component {
  static getDefaultClassNames() {
    return classnames({
      'mdc-dialog': true,
    });
  }
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
    this.getButtonAcceptClassNamesFromProps = this.getButtonAcceptClassNamesFromProps.bind(this);
    this.getButtonCancelClassNamesFromProps = this.getButtonCancelClassNamesFromProps.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesAsString = this.getClassNamesAsString.bind(this);
    this.getClassNamesBodyAsString = this.getClassNamesBodyAsString.bind(this);
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
  getButtonAcceptClassNamesFromProps() {
    return classnames({
      'mdc-dialog__footer__button': true,
      'mdc-dialog__footer__button--accept': true,
      'mdc-dialog__action': this.props.secondaryAccept,
    });
  }
  getButtonCancelClassNamesFromProps() {
    return classnames({
      'mdc-dialog__footer__button': true,
      'mdc-dialog__footer__button--cancel': true,
      'mdc-dialog__action': this.props.secondaryCancel,
    });
  }
  getClassNames() {
    return this.state.classNamesRoot.join(' ');
  }
  getClassNamesAsString() {
    return `${Dialog.getDefaultClassNames()} ${this.getClassNames()} ${this.props.className}`
      .trim().replace('  ', ' ');
  }
  getClassNamesBodyAsString() {
    return classnames({
      'mdc-dialog__body': true,
      'mdc-dialog__body--scrollable': this.props.scrollable,
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
              className={this.getButtonCancelClassNamesFromProps()}
              rippleCentered={rippleCentered}
              rippleEnabled={rippleEnabled}
            >
              {labelCancel}
            </Button>
            <Button
              className={this.getButtonAcceptClassNamesFromProps()}
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
  labelAccept: PropTypes.string.isRequired,
  labelCancel: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  rippleCentered: PropTypes.bool,
  rippleEnabled: PropTypes.bool,
  scrollable: PropTypes.bool,
  secondaryAccept: PropTypes.bool,
  secondaryCancel: PropTypes.bool,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};

Dialog.defaultProps = {
  className: '',
  rippleCentered: false,
  rippleEnabled: false,
  scrollable: false,
  secondaryAccept: false,
  secondaryCancel: false,
  visible: false,
};

export default Dialog;
