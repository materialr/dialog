import * as dialog from '@material/dialog';
import { strings } from '@material/dialog/constants';
import Button from '@materialr/button';
import { mount, shallow } from 'enzyme';
import React from 'react';

import Dialog from './index';

const BODY = 'BODY';
const LABEL_ACCEPT = 'LABEL_ACCEPT';
const LABEL_CANCEL = 'LABEL_CANCEL';
const ON_ACCEPT = () => 'ON_ACCEPT';
const ON_CANCEL = () => 'ON_CANCEL';
const TITLE = 'TITLE';

test('Renders the default classNames', () => {
  const wrapper = shallow(
    <Dialog
      body={BODY}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      title={TITLE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-dialog';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders additional classNames from the \'className\' prop', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <Dialog
      body={BODY}
      className={CLASS_NAME}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      title={TITLE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-dialog ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders the default body classNames', () => {
  const wrapper = shallow(
    <Dialog
      body={BODY}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      title={TITLE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-dialog__body';

  const actual = wrapper.find('section').props().className;

  expect(actual).toBe(expected);
});

test('Renders a scrollable body', () => {
  const wrapper = shallow(
    <Dialog
      body={BODY}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      scrollable
      title={TITLE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-dialog__body mdc-dialog__body--scrollable';

  const actual = wrapper.find('section').props().className;

  expect(actual).toBe(expected);
});

test('Renders the default accept button classNames', () => {
  const wrapper = shallow(
    <Dialog
      body={BODY}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      title={TITLE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-dialog__footer__button mdc-dialog__footer__button--accept';

  const actual = wrapper.find(Button).at(1).props().className;

  expect(actual).toBe(expected);
});

test('Renders the secondary accept button classNames', () => {
  const wrapper = shallow(
    <Dialog
      body={BODY}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      secondaryAccept
      title={TITLE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-dialog__footer__button mdc-dialog__footer__button--accept ' +
    'mdc-dialog__action';

  const actual = wrapper.find(Button).at(1).props().className;

  expect(actual).toBe(expected);
});

test('Renders the default cancel button classNames', () => {
  const wrapper = shallow(
    <Dialog
      body={BODY}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      title={TITLE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-dialog__footer__button mdc-dialog__footer__button--cancel';

  const actual = wrapper.find(Button).at(0).props().className;

  expect(actual).toBe(expected);
});

test('Renders the secondary cancel button classNames', () => {
  const wrapper = shallow(
    <Dialog
      body={BODY}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      secondaryCancel
      title={TITLE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-dialog__footer__button mdc-dialog__footer__button--cancel ' +
    'mdc-dialog__action';

  const actual = wrapper.find(Button).at(0).props().className;

  expect(actual).toBe(expected);
});

test('Passes through the correct props', () => {
  const wrapper = shallow(
    <Dialog
      body={BODY}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      title={TITLE}
    />,
    { disableLifecycleMethods: true },
  );
  const expectedBody = BODY;
  const expectedLabelAccept = LABEL_ACCEPT;
  const expectedLabelCancel = LABEL_CANCEL;
  const expectedTitle = TITLE;

  const buttons = wrapper.find(Button);
  const buttonAcceptProps = buttons.at(1).props();
  const buttonCancelProps = buttons.at(0).props();
  const actualBody = wrapper.find('section').props().children;
  const actualLabelAccept = buttonAcceptProps.children;
  const actualLabelCancel = buttonCancelProps.children;
  const actualTitle = wrapper.find('h2').text();

  expect(actualBody).toBe(expectedBody);
  expect(actualLabelAccept).toBe(expectedLabelAccept);
  expect(actualLabelCancel).toBe(expectedLabelCancel);
  expect(actualTitle).toBe(expectedTitle);
});

test('Creates the MDCDialog component on mount', () => {
  const listen = jest.fn();
  const show = jest.fn();
  const MDCDialog = jest.fn();
  MDCDialog.mockImplementation(() => ({ listen, show }));
  dialog.MDCDialog = MDCDialog;
  const wrapper = mount(
    <Dialog
      body={BODY}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      title={TITLE}
    />,
  );
  const instance = wrapper.instance();
  const expectedListenAcceptOne = strings.ACCEPT_EVENT;
  const expectedListenAcceptTwo = ON_ACCEPT;
  const expectedListenCancelOne = strings.CANCEL_EVENT;
  const expectedListenCancelTwo = ON_CANCEL;
  const expectedMDCDialog = instance.elementRoot;
  const expectedShow = 1;

  const mockListenCalls = listen.mock.calls;
  const mockListenCallsAccept = mockListenCalls[0];
  const mockListenCallsCancel = mockListenCalls[1];
  const actualListenAcceptOne = mockListenCallsAccept[0];
  const actualListenAcceptTwo = mockListenCallsAccept[1];
  const actualListenCancelOne = mockListenCallsCancel[0];
  const actualListenCancelTwo = mockListenCallsCancel[1];
  const actualMDCDialog = MDCDialog.mock.calls[0][0];
  const actualShow = show.mock.calls.length;

  expect(actualMDCDialog).toBe(expectedMDCDialog);
  expect(actualListenAcceptOne).toBe(expectedListenAcceptOne);
  expect(actualListenAcceptTwo).toBe(expectedListenAcceptTwo);
  expect(actualListenCancelOne).toBe(expectedListenCancelOne);
  expect(actualListenCancelTwo).toBe(expectedListenCancelTwo);
  expect(actualShow).toBe(expectedShow);
});

test('Destroys the MDCDialog component on unmount', () => {
  const destroy = jest.fn();
  const listen = () => {};
  const show = () => {};
  const unlisten = jest.fn();
  const MDCDialog = jest.fn();
  MDCDialog.mockImplementation(() => ({ destroy, listen, show, unlisten }));
  dialog.MDCDialog = MDCDialog;
  const wrapper = mount(
    <Dialog
      body={BODY}
      labelAccept={LABEL_ACCEPT}
      labelCancel={LABEL_CANCEL}
      onAccept={ON_ACCEPT}
      onCancel={ON_CANCEL}
      title={TITLE}
    />,
  );
  const expectedDestroy = 1;
  const expectedUnlistenAcceptOne = strings.ACCEPT_EVENT;
  const expectedUnlistenAcceptTwo = ON_ACCEPT;
  const expectedUnlistenCancelOne = strings.CANCEL_EVENT;
  const expectedUnlistenCancelTwo = ON_CANCEL;

  wrapper.unmount();
  const actualDestroy = destroy.mock.calls.length;
  const mockUnlistenCalls = unlisten.mock.calls;
  const mockUnlistenCallsAccept = mockUnlistenCalls[0];
  const mockUnlistenCallsCancel = mockUnlistenCalls[1];
  const actualUnlistenAcceptOne = mockUnlistenCallsAccept[0];
  const actualUnlistenAcceptTwo = mockUnlistenCallsAccept[1];
  const actualUnlistenCancelOne = mockUnlistenCallsCancel[0];
  const actualUnlistenCancelTwo = mockUnlistenCallsCancel[1];

  expect(actualDestroy).toBe(expectedDestroy);
  expect(actualUnlistenAcceptOne).toBe(expectedUnlistenAcceptOne);
  expect(actualUnlistenAcceptTwo).toBe(expectedUnlistenAcceptTwo);
  expect(actualUnlistenCancelOne).toBe(expectedUnlistenCancelOne);
  expect(actualUnlistenCancelTwo).toBe(expectedUnlistenCancelTwo);
});
