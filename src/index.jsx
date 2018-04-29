import { MDCDialog } from '@material/dialog';
import { strings } from '@material/dialog/constants';
import Button from '@materialr/button';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.elementRoot = undefined;
    this.dialog = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesAccept = this.getClassNamesAccept.bind(this);
    this.getClassNamesBody = this.getClassNamesBody.bind(this);
    this.getClassNamesCancel = this.getClassNamesCancel.bind(this);
  }
  componentDidMount() {
    const { ACCEPT_EVENT, CANCEL_EVENT } = strings;
    const { onAccept, onCancel } = this.props;
    this.dialog = new MDCDialog(this.elementRoot);
    this.dialog.listen(ACCEPT_EVENT, onAccept);
    this.dialog.listen(CANCEL_EVENT, onCancel);
    this.dialog.show();
  }
  componentWillUnmount() {
    const { ACCEPT_EVENT, CANCEL_EVENT } = strings;
    const { onAccept, onCancel } = this.props;
    this.dialog.unlisten(ACCEPT_EVENT, onAccept);
    this.dialog.unlisten(CANCEL_EVENT, onCancel);
    this.dialog.destroy();
  }
  getClassNames() {
    const { className } = this.props;
    return classnames({
      'mdc-dialog': true,
      [className]: !!className,
    });
  }
  getClassNamesAccept() {
    return classnames({
      'mdc-dialog__footer__button': true,
      'mdc-dialog__footer__button--accept': true,
      'mdc-dialog__action': this.props.secondaryAccept,
    });
  }
  getClassNamesBody() {
    return classnames({
      'mdc-dialog__body': true,
      'mdc-dialog__body--scrollable': this.props.scrollable,
    });
  }
  getClassNamesCancel() {
    return classnames({
      'mdc-dialog__footer__button': true,
      'mdc-dialog__footer__button--cancel': true,
      'mdc-dialog__action': this.props.secondaryCancel,
    });
  }
  render() {
    const {
      getClassNames,
      getClassNamesAccept,
      getClassNamesBody,
      getClassNamesCancel,
      props: { body, labelAccept, labelCancel, title },
    } = this;
    return (
      <aside
        aria-describedby="materialr-dialog-description"
        aria-labelledby="materialr-dialog-label"
        className={getClassNames()}
        ref={(elementRoot) => { this.elementRoot = elementRoot; }}
        role="alertdialog"
      >
        <div className="mdc-dialog__surface">
          <header className="mdc-dialog__header">
            <h2 id="materialr-dialog-label" className="mdc-dialog__header__title">{title}</h2>
          </header>
          <section id="materialr-dialog-description" className={getClassNamesBody()}>
            {body}
          </section>
          <footer className="mdc-dialog__footer">
            <Button className={getClassNamesCancel()}>{labelCancel}</Button>
            <Button className={getClassNamesAccept()}>{labelAccept}</Button>
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
  secondaryAccept: PropTypes.bool,
  secondaryCancel: PropTypes.bool,
  scrollable: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Dialog.defaultProps = {
  className: undefined,
  secondaryAccept: false,
  secondaryCancel: false,
  scrollable: false,
};

export default Dialog;
