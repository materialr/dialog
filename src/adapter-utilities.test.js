import adapterUtilities from './adapter-utilities';

const adapterUtilitiesInstance = adapterUtilities();

const CLASS_NAME_ONE = 'CLASS_NAME_ONE';
const CLASS_NAME_TWO = 'CLASS_NAME_TWO';

test('\'addClassBody()\' adds a class to the body element', () => {
  const ADD = jest.fn();
  const body = { classList: { add: ADD } };
  const CLASS_NAME = 'CLASS_NAME';
  const expected = CLASS_NAME;

  adapterUtilitiesInstance.addClassBody(body)(CLASS_NAME);
  const actual = ADD.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'addClassRoot()\' calls \'updateClassNamesRoot()\' with all classes', () => {
  const UPDATE_CLASS_NAMES_ROOT = jest.fn();
  const expectedOne = [CLASS_NAME_ONE];
  const expectedTwo = [CLASS_NAME_ONE, CLASS_NAME_TWO];

  adapterUtilitiesInstance.addClassRoot(UPDATE_CLASS_NAMES_ROOT)(CLASS_NAME_ONE);
  adapterUtilitiesInstance.addClassRoot(UPDATE_CLASS_NAMES_ROOT)(CLASS_NAME_TWO);
  const actualOne = UPDATE_CLASS_NAMES_ROOT.mock.calls[0][0];
  const actualTwo = UPDATE_CLASS_NAMES_ROOT.mock.calls[1][0];

  expect(actualOne).toEqual(expectedOne);
  expect(actualTwo).toEqual(expectedTwo);
});

test('\'deregisterInteractionHandler()\' removes an event listener from an element', () => {
  const HANDLER = 'HANDLER';
  const TYPE = 'TYPE';
  const REMOVE_EVENT_LISTENER = jest.fn();
  const element = { removeEventListener: REMOVE_EVENT_LISTENER };
  const expectedHandler = HANDLER;
  const expectedType = TYPE;

  adapterUtilitiesInstance.deregisterInteractionHandler(element)(HANDLER, TYPE);
  const actualHandler = REMOVE_EVENT_LISTENER.mock.calls[0][0];
  const actualType = REMOVE_EVENT_LISTENER.mock.calls[0][1];

  expect(actualHandler).toBe(expectedHandler);
  expect(actualType).toBe(expectedType);
});

test('\'eventTargetHasClass()\' checks whether a target contains a class', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const CONTAINS = jest.fn();
  const target = { classList: { contains: CONTAINS } };
  const expected = CLASS_NAME;

  adapterUtilitiesInstance.eventTargetHasClass()(target, CLASS_NAME);
  const actual = CONTAINS.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'isDialog()\' tests whether an element is the dialog', () => {
  const ELEMENT_SURFACE = 'ELEMENT_SURFACE';
  const ELEMENT_FAIL = 'ELEMENT_FAIL';
  const ELEMENT_MATCH = ELEMENT_SURFACE;
  const expectedOne = true;
  const expectedTwo = false;

  const actualOne = adapterUtilitiesInstance.isDialog(ELEMENT_SURFACE)(ELEMENT_MATCH);
  const actualTwo = adapterUtilitiesInstance.isDialog(ELEMENT_SURFACE)(ELEMENT_FAIL);

  expect(actualOne).toBe(expectedOne);
  expect(actualTwo).toBe(expectedTwo);
});

test('\'layoutFooterRipples()\' does nothing', () => {
  const expected = undefined;

  const actual = adapterUtilitiesInstance.layoutFooterRipples()();

  expect(actual).toBe(expected);
});

test('\'registerInteractionHandler()\' adds an event listener to an element', () => {
  const HANDLER = 'HANDLER';
  const TYPE = 'TYPE';
  const ADD_EVENT_LISTENER = jest.fn();
  const element = { addEventListener: ADD_EVENT_LISTENER };
  const expectedHandler = HANDLER;
  const expectedType = TYPE;

  adapterUtilitiesInstance.registerInteractionHandler(element)(HANDLER, TYPE);
  const actualHandler = ADD_EVENT_LISTENER.mock.calls[0][0];
  const actualType = ADD_EVENT_LISTENER.mock.calls[0][1];

  expect(actualHandler).toBe(expectedHandler);
  expect(actualType).toBe(expectedType);
});

test('\'removeClassBody()\' removes a class from the body element', () => {
  const REMOVE = jest.fn();
  const body = { classList: { remove: REMOVE } };
  const CLASS_NAME = 'CLASS_NAME';
  const expected = CLASS_NAME;

  adapterUtilitiesInstance.removeClassBody(body)(CLASS_NAME);
  const actual = REMOVE.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'removeClassRoot()\' calls \'updateClassNamesRoot()\' with all classes', () => {
  const UPDATE_CLASS_NAMES_ROOT = jest.fn();
  const expectedOne = [CLASS_NAME_ONE];
  const expectedTwo = [];

  adapterUtilitiesInstance.removeClassRoot(UPDATE_CLASS_NAMES_ROOT)(CLASS_NAME_TWO);
  adapterUtilitiesInstance.removeClassRoot(UPDATE_CLASS_NAMES_ROOT)(CLASS_NAME_ONE);
  const actualOne = UPDATE_CLASS_NAMES_ROOT.mock.calls[0][0];
  const actualTwo = UPDATE_CLASS_NAMES_ROOT.mock.calls[1][0];

  expect(actualOne).toEqual(expectedOne);
  expect(actualTwo).toEqual(expectedTwo);
});

test('\'trapFocusOnSurface()\' calls \'activate\' on the focusTrap', () => {
  const ACTIVATE = jest.fn();
  const focusTrap = { activate: ACTIVATE };
  const expected = 1;

  adapterUtilitiesInstance.trapFocusOnSurface(focusTrap)();
  const actual = ACTIVATE.mock.calls.length;

  expect(actual).toBe(expected);
});

test('\'untrapFocusOnSurface()\' calls \'deactivate\' on the focusTrap', () => {
  const DEACTIVATE = jest.fn();
  const focusTrap = { deactivate: DEACTIVATE };
  const expected = 1;

  adapterUtilitiesInstance.untrapFocusOnSurface(focusTrap)();
  const actual = DEACTIVATE.mock.calls.length;

  expect(actual).toBe(expected);
});
