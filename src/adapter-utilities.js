let classNamesRoot = [];

export const addClassBody = body => className => body.classList.add(className);

export const addClassRoot = updateClassNamesRoot => (className) => {
  classNamesRoot = [...classNamesRoot, className];
  updateClassNamesRoot(classNamesRoot);
};

export const deregisterInteractionHandler = element => (type, handler) =>
  element.removeEventListener(type, handler);

export const eventTargetHasClass = () => (target, className) =>
  target.classList.contains(className);

export const isDialog = elementSurface => element => elementSurface === element;

export const layoutFooterRipples = () => () => {};

export const registerInteractionHandler = element => (type, handler) =>
  element.addEventListener(type, handler);

export const removeClassBody = body => className => body.classList.remove(className);

export const removeClassRoot = updateClassNamesRoot => (className) => {
  classNamesRoot = classNamesRoot.filter(singleClassName => singleClassName !== className);
  updateClassNamesRoot(classNamesRoot);
};

export const trapFocusOnSurface = focusTrap => () => focusTrap.activate();

export const untrapFocusOnSurface = focusTrap => () => focusTrap.deactivate();
