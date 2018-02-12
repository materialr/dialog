import { MDCDialogFoundation } from '@material/dialog';

import adapterUtilities from './adapter-utilities';

export default ({
  elementRoot,
  elementSurface,
  focusTrap,
  onAccept,
  onCancel,
  updateClassNamesRoot,
}) => {
  const {
    addClassBody,
    addClassRoot,
    deregisterInteractionHandler,
    eventTargetHasClass,
    isDialog,
    layoutFooterRipples,
    registerInteractionHandler,
    removeClassBody,
    removeClassRoot,
    trapFocusOnSurface,
    untrapFocusOnSurface,
  } = adapterUtilities();

  return new MDCDialogFoundation({
    addClass: addClassRoot(updateClassNamesRoot),
    removeClass: removeClassRoot(updateClassNamesRoot),
    addBodyClass: addClassBody(document.body),
    removeBodyClass: removeClassBody(document.body),
    eventTargetHasClass: eventTargetHasClass(),
    registerInteractionHandler: registerInteractionHandler(elementRoot),
    deregisterInteractionHandler: deregisterInteractionHandler(elementRoot),
    registerSurfaceInteractionHandler: registerInteractionHandler(elementSurface),
    deregisterSurfaceInteractionHandler: deregisterInteractionHandler(elementSurface),
    registerDocumentKeydownHandler: handler =>
      registerInteractionHandler(document)('keydown', handler),
    deregisterDocumentKeydownHandler: handler =>
      deregisterInteractionHandler(document)('keydown', handler),
    registerTransitionEndHandler: handler =>
      registerInteractionHandler(elementSurface)('transitionend', handler),
    deregisterTransitionEndHandler: handler =>
      deregisterInteractionHandler(elementSurface)('transitionend', handler),
    notifyAccept: onAccept,
    notifyCancel: onCancel,
    trapFocusOnSurface: trapFocusOnSurface(focusTrap),
    untrapFocusOnSurface: untrapFocusOnSurface(focusTrap),
    isDialog: isDialog(elementSurface),
    layoutFooterRipples: layoutFooterRipples(),
  });
};
