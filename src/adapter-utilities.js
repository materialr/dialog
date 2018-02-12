export default () => {
  let classNamesRoot = [];

  return {
    addClassBody: body => className => body.classList.add(className),
    addClassRoot: updateClassNamesRoot => (className) => {
      classNamesRoot = [...classNamesRoot, className];
      updateClassNamesRoot(classNamesRoot);
    },
    deregisterInteractionHandler: element => (type, handler) =>
      element.removeEventListener(type, handler),
    eventTargetHasClass: () => (target, className) =>
      target.classList.contains(className),
    isDialog: elementSurface => element => elementSurface === element,
    layoutFooterRipples: () => () => {},
    registerInteractionHandler: element => (type, handler) =>
      element.addEventListener(type, handler),
    removeClassBody: body => className => body.classList.remove(className),
    removeClassRoot: updateClassNamesRoot => (className) => {
      classNamesRoot = classNamesRoot.filter(singleClassName => singleClassName !== className);
      updateClassNamesRoot(classNamesRoot);
    },
    trapFocusOnSurface: focusTrap => () => focusTrap.activate(),
    untrapFocusOnSurface: focusTrap => () => focusTrap.deactivate(),
  };
};
