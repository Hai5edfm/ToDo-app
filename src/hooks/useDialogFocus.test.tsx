import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDialogFocus } from './useDialogFocus';

const EmptyDialog = () => {
  const dialogRef = useDialogFocus('input');

  return (
    <div ref={dialogRef} role="dialog" aria-label="Empty dialog">
      <p>No controls available</p>
    </div>
  );
};

describe('useDialogFocus', () => {
  it('moves focus to the dialog root when there are no focusable descendants', () => {
    render(<EmptyDialog />);

    expect(screen.getByRole('dialog', { name: 'Empty dialog' })).toHaveFocus();
  });
});
