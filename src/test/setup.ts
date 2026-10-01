import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';

beforeEach(() => {
  window.localStorage.clear();
  document.body.innerHTML = '<div id="modal-root"></div>';
});
