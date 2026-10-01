import { useLayoutEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export const useDialogFocus = (initialFocusSelector: string) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  // Capture during render, before the Add form's autoFocus runs during commit.
  const openerRef = useRef<HTMLElement | null>(
    typeof document === 'undefined' || !(document.activeElement instanceof HTMLElement)
      ? null
      : document.activeElement,
  );

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const getFocusableElements = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true',
      );

    const initialFocus = dialog.querySelector<HTMLElement>(initialFocusSelector);
    const firstFocusable = initialFocus ?? getFocusableElements()[0];
    if (!firstFocusable) dialog.tabIndex = -1;
    (firstFocusable ?? dialog).focus();

    const containTabFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === first || !dialog.contains(activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (activeElement === last || !dialog.contains(activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener('keydown', containTabFocus);

    return () => {
      dialog.removeEventListener('keydown', containTabFocus);
      if (openerRef.current?.isConnected) openerRef.current.focus();
    };
  }, [initialFocusSelector]);

  return dialogRef;
};
