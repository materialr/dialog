import { util } from '@material/dialog';
import Button from '@materialr/button';
import { mount, shallow } from 'enzyme';
import focusTrap from 'focus-trap';
import React from 'react';

import Dialog from './index';
import dialogFoundation from './foundation';

const BODY = 'BODY';
const LABEL_ACCEPT = 'LABEL_ACCEPT';
const LABEL_CANCEL = 'LABEL_CANCEL';
const ON_ACCEPT = () => 'ON_ACCEPT';
const ON_CANCEL = () => 'ON_CANCEL';
const TITLE = 'TITLE';
const defaultProps = {
  body: BODY,
  labelAccept: LABEL_ACCEPT,
  labelCancel: LABEL_CANCEL,
  onAccept: ON_ACCEPT,
  onCancel: ON_CANCEL,
  title: TITLE,
};

test('Dialog > Renders the correct default children', () => {
  const wrapper = mount(<Dialog {...defaultProps} />, { disableLifecycleMethods: true });
  const expectedBody = BODY;
  const expectedLabelAccept = LABEL_ACCEPT;
  const expectedLabelCancel = LABEL_CANCEL;
  const expectedTitle = TITLE;

  const actualBody = wrapper.find('#materialr-dialog-description').text();
  const actualLabelAccept = wrapper.find(Button).at(1).text();
  const actualLabelCancel = wrapper.find(Button).at(0).text();
  const actualTitle = wrapper.find('#materialr-dialog-label').text();

  expect(actualBody).toBe(expectedBody);
  expect(actualLabelAccept).toBe(expectedLabelAccept);
  expect(actualLabelCancel).toBe(expectedLabelCancel);
  expect(actualTitle).toBe(expectedTitle);
});

test('Dialog > Passed the ripple properties to both buttons', () => {
  const RIPPLE_CENTERED = true;
  const RIPPLE_ENABLED = true;
  const wrapper = shallow(
    <Dialog {...defaultProps} rippleCentered={RIPPLE_CENTERED} rippleEnabled={RIPPLE_ENABLED} />,
    { disableLifecycleMethods: true },
  );
  const buttons = wrapper.find(Button);
  const buttonOne = buttons.at(0);
  const buttonTwo = buttons.at(1);
  const expectedCenteredOne = RIPPLE_CENTERED;
  const expectedCenteredTwo = RIPPLE_CENTERED;
  const expectedEnabledOne = RIPPLE_ENABLED;
  const expectedEnabledTwo = RIPPLE_ENABLED;

  const actualCenteredOne = buttonOne.props().rippleCentered;
  const actualCenteredTwo = buttonTwo.props().rippleCentered;
  const actualEnabledOne = buttonOne.props().rippleEnabled;
  const actualEnabledTwo = buttonTwo.props().rippleEnabled;

  expect(actualCenteredOne).toBe(expectedCenteredOne);
  expect(actualCenteredTwo).toBe(expectedCenteredTwo);
  expect(actualEnabledOne).toBe(expectedEnabledOne);
  expect(actualEnabledTwo).toBe(expectedEnabledTwo);
});

test('Dialog > Builds all classNames from props', () => {
  const wrapper = shallow(
    <Dialog {...defaultProps} dark scrollable />,
    { disableLifecycleMethods: true },
  );
  const expectedBody = 'mdc-dialog__body mdc-dialog__body--scrollable';
  const expectedRoot = 'mdc-dialog mdc-dialog--theme-dark';

  const actualBody = wrapper.find('#materialr-dialog-description').props().className;
  const actualRoot = wrapper.props().className;

  expect(actualBody).toBe(expectedBody);
  expect(actualRoot).toBe(expectedRoot);
});

test('Dialog > Creates a focus trap', () => {
  const wrapper = shallow(<Dialog {...defaultProps} />);
  const { accept, focusTrap: focusTrapInstance, surface } = wrapper.instance();
  const expected = util.createFocusTrapInstance(surface, accept, focusTrap);

  const actual = focusTrapInstance;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Dialog > Creates a dialog foundation', () => {
  const wrapper = mount(<Dialog {...defaultProps} visible />);
  const instance = wrapper.instance();
  const { focusTrap: focusTrapInstance, root, surface, updateClassNamesRoot } = instance;
  const expected = dialogFoundation({
    elementRoot: root,
    elementSurface: surface,
    focusTrap: focusTrapInstance,
    onAccept: ON_ACCEPT,
    onCancel: ON_CANCEL,
    updateClassNamesRoot,
  });
  expected.open();

  const actual = wrapper.instance().dialogFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Dialog > Opens when the \'visible\' prop becomes \'true\'', () => {
  const wrapper = mount(<Dialog {...defaultProps} />);
  wrapper.instance().dialogFoundation.open = jest.fn();
  wrapper.setProps({ visible: true });
  const expected = 1;

  const actual = wrapper.instance().dialogFoundation.open.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Dialog > Closes when the \'visible\' prop becomes \'false\'', () => {
  const close = jest.fn();
  const wrapper = mount(<Dialog {...defaultProps} visible />);
  wrapper.instance().dialogFoundation.close = close;
  wrapper.setProps({ visible: false });
  const expected = 1;

  const actual = close.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Dialog > Closes when the component unmounts', () => {
  const destroy = jest.fn();
  const wrapper = mount(<Dialog {...defaultProps} visible />);
  wrapper.instance().dialogFoundation.destroy = destroy;
  const expected = 1;

  wrapper.unmount();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Dialog > Removes the foundation after destroying', () => {
  const wrapper = mount(<Dialog {...defaultProps} visible />);
  const expected = undefined;
  wrapper.instance().dialogFoundationDestroy();

  const actual = wrapper.instance().dialogFoundation;

  expect(actual).toBe(expected);
});
