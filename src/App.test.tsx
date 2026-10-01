import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import type { ToDo } from './customTypes/ToDo';
import { App } from './App';

const savedToDos: ToDo[] = [
  { id: 'oatmeal', text: 'Make oatmeal', isCompleted: false },
  { id: 'finish', text: 'Finish report', isCompleted: true },
  { id: 'tea', text: 'Make tea', isCompleted: false },
];

const saveToDos = (toDos: ToDo[]) => {
  window.localStorage.setItem('toDos', JSON.stringify(toDos));
};

describe('App', () => {
  it('renders the empty-list state without a visible task counter', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'To-do list' })).toBeInTheDocument();
    expect(screen.queryByText(/you have \d+ tasks pending/i)).not.toBeInTheDocument();
    expect(screen.getByText(/haven't added any toDos yet/i)).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('opens the add modal and creates a task', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /add your first todo/i }));
    expect(screen.getByRole('textbox', { name: 'Add your new To-do' })).toBeVisible();

    await user.type(screen.getByRole('textbox', { name: 'Add your new To-do' }), 'Read a book');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.queryByRole('textbox', { name: 'Add your new To-do' })).not.toBeInTheDocument();
    expect(screen.getByText('Read a book')).toBeInTheDocument();
    expect(screen.queryByText(/you have \d+ tasks pending/i)).not.toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem('toDos') || '[]')).toMatchObject([
      { text: 'Read a book', isCompleted: false },
    ]);
  });

  it('marks a task complete', async () => {
    const user = userEvent.setup();
    saveToDos([savedToDos[0]]);
    render(<App />);

    const task = screen.getByText('Make oatmeal').closest('section');
    expect(task).not.toBeNull();
    const completeButton = task?.querySelector('button.complete-to-do-button');
    expect(completeButton).not.toBeNull();
    await user.click(completeButton!);

    expect(completeButton).toHaveClass('completedButton');
    expect(screen.getByText('Make oatmeal')).toHaveClass('todo-card__text-completed');
    expect(JSON.parse(window.localStorage.getItem('toDos') || '[]')[0].isCompleted).toBe(true);
  });

  it('allows a removal to be canceled or confirmed', async () => {
    const user = userEvent.setup();
    saveToDos([savedToDos[0]]);
    render(<App />);

    const task = screen.getByText('Make oatmeal').closest('section');
    const removeButton = task?.querySelector('button.remove-to-do-button');
    expect(removeButton).not.toBeNull();
    await user.click(removeButton!);
    expect(screen.getByText('Are you sure you want to remove this task?')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'No' }));
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.queryByText('Are you sure you want to remove this task?')).not.toBeInTheDocument();

    await user.click(removeButton!);
    await user.click(screen.getByRole('button', { name: 'Yes' }));
    expect(screen.queryByText('Make oatmeal')).not.toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem('toDos') || '[]')).toEqual([]);
  });

  it('provides a selected All tab and filters tasks through Pending and Done tabs', async () => {
    const user = userEvent.setup();
    saveToDos(savedToDos);
    render(<App />);

    const allTab = screen.getByRole('tab', { name: 'All' });
    const pendingTab = screen.getByRole('tab', { name: 'Pending' });
    const doneTab = screen.getByRole('tab', { name: 'Done' });
    const panel = screen.getByRole('tabpanel');

    expect(allTab).toHaveAttribute('aria-selected', 'true');
    expect(pendingTab).toHaveAttribute('aria-selected', 'false');
    expect(doneTab).toHaveAttribute('aria-selected', 'false');
    expect(allTab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', allTab.id);
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Finish report')).toBeInTheDocument();

    await user.click(pendingTab);
    expect(pendingTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Make tea')).toBeInTheDocument();
    expect(screen.queryByText('Finish report')).not.toBeInTheDocument();

    await user.click(doneTab);
    expect(doneTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Finish report')).toBeInTheDocument();
    expect(screen.queryByText('Make oatmeal')).not.toBeInTheDocument();

    await user.click(allTab);
    expect(allTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Finish report')).toBeInTheDocument();
    expect(screen.getByText('Make tea')).toBeInTheDocument();
  });

  it('shows an accessible clear control only for a non-empty query and renders a black Search icon', async () => {
    const user = userEvent.setup();
    render(<App />);

    const search = screen.getByRole('textbox', { name: 'Search ToDos' });
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();

    await user.type(search, 'tea');
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();

    const searchIcon = document.querySelector('.search-to-do__icon svg path');
    expect(searchIcon).toHaveAttribute('stroke', '#000');
  });

  it('preserves the query and composes it with All, Pending, and Done tabs', async () => {
    const user = userEvent.setup();
    saveToDos(savedToDos);
    render(<App />);

    const search = screen.getByRole('textbox', { name: 'Search ToDos' });
    await user.type(search, 'e');
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Finish report')).toBeInTheDocument();
    expect(screen.getByText('Make tea')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Pending' }));
    expect(search).toHaveValue('e');
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Make tea')).toBeInTheDocument();
    expect(screen.queryByText('Finish report')).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Done' }));
    expect(search).toHaveValue('e');
    expect(screen.getByText('Finish report')).toBeInTheDocument();
    expect(screen.queryByText('Make oatmeal')).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'All' }));
    expect(search).toHaveValue('e');
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Finish report')).toBeInTheDocument();
    expect(screen.getByText('Make tea')).toBeInTheDocument();
  });

  it('clears the query without changing the selected tab', async () => {
    const user = userEvent.setup();
    saveToDos(savedToDos);
    render(<App />);

    await user.click(screen.getByRole('tab', { name: 'Pending' }));
    const search = screen.getByRole('textbox', { name: 'Search ToDos' });
    await user.type(search, 'tea');
    await user.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(search).toHaveValue('');
    expect(search).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Pending' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Make tea')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('keeps task persistence and status filtering correct after completion and removal', async () => {
    const user = userEvent.setup();
    saveToDos(savedToDos);
    render(<App />);

    await user.click(screen.getByRole('tab', { name: 'Pending' }));
    await user.click(screen.getByRole('button', { name: 'Mark Make oatmeal as complete' }));
    expect(screen.queryByText('Make oatmeal')).not.toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem('toDos') || '[]')).toHaveLength(3);

    await user.click(screen.getByRole('tab', { name: 'Done' }));
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Remove Make oatmeal' }));
    await user.click(screen.getByRole('button', { name: 'Yes' }));

    expect(screen.queryByText('Make oatmeal')).not.toBeInTheDocument();
    expect(screen.getByText('Finish report')).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem('toDos') || '[]')).toHaveLength(2);
  });

  it('moves tab focus and selection with Arrow, Home, and End keys', async () => {
    const user = userEvent.setup();
    saveToDos(savedToDos);
    render(<App />);

    const allTab = screen.getByRole('tab', { name: 'All' });
    const pendingTab = screen.getByRole('tab', { name: 'Pending' });
    const doneTab = screen.getByRole('tab', { name: 'Done' });

    allTab.focus();
    await user.keyboard('{ArrowRight}');
    expect(pendingTab).toHaveFocus();
    expect(pendingTab).toHaveAttribute('aria-selected', 'true');
    expect(allTab).toHaveAttribute('tabindex', '-1');

    await user.keyboard('{End}');
    expect(doneTab).toHaveFocus();
    expect(doneTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Home}');
    expect(allTab).toHaveFocus();
    expect(allTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowLeft}');
    expect(doneTab).toHaveFocus();
    expect(doneTab).toHaveAttribute('aria-selected', 'true');
  });

  it('gives icon-only controls accessible names and exposes task dialogs', async () => {
    const user = userEvent.setup();
    saveToDos([savedToDos[0]]);
    render(<App />);

    expect(screen.getByRole('textbox', { name: 'Search ToDos' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /add a task/i }));
    expect(screen.getByRole('dialog', { name: 'Add a task' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Close add task dialog' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close add task dialog' }));

    const task = screen.getByText('Make oatmeal').closest('.todo-card') as HTMLElement | null;
    expect(task).not.toBeNull();
    expect(within(task as HTMLElement).getByRole('button', { name: 'Mark Make oatmeal as complete' })).toBeInTheDocument();
    await user.click(within(task as HTMLElement).getByRole('button', { name: 'Remove Make oatmeal' }));
    expect(screen.getByRole('dialog', { name: 'Remove task' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
  });

  it('moves focus into the add dialog, contains keyboard focus, and restores its opener', async () => {
    const user = userEvent.setup();
    render(<App />);

    const opener = screen.getByRole('button', { name: /add a task/i });
    await user.click(opener);

    const dialog = screen.getByRole('dialog', { name: 'Add a task' });
    const input = within(dialog).getByRole('textbox', { name: 'Add your new To-do' });
    expect(input).toHaveFocus();

    const closeButton = within(dialog).getByRole('button', { name: 'Close add task dialog' });
    const submitButton = within(dialog).getByRole('button', { name: 'Add' });
    closeButton.focus();
    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(submitButton).toHaveFocus();
    await user.keyboard('{Tab}');
    expect(closeButton).toHaveFocus();

    await user.click(closeButton);
    expect(opener).toHaveFocus();
  });

  it('moves focus safely into the remove dialog, contains keyboard focus, and restores its opener', async () => {
    const user = userEvent.setup();
    saveToDos([savedToDos[0]]);
    render(<App />);

    const opener = screen.getByRole('button', { name: 'Remove Make oatmeal' });
    await user.click(opener);

    const dialog = screen.getByRole('dialog', { name: 'Remove task' });
    const yesButton = within(dialog).getByRole('button', { name: 'Yes' });
    const noButton = within(dialog).getByRole('button', { name: 'No' });
    expect(noButton).toHaveFocus();

    yesButton.focus();
    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(noButton).toHaveFocus();
    await user.keyboard('{Tab}');
    expect(yesButton).toHaveFocus();

    await user.click(noButton);
    expect(opener).toHaveFocus();
  });

  it.each([
    { filter: 'Pending', expectedMessage: 'No pending tasks.', isCompleted: true },
    { filter: 'Done', expectedMessage: 'No completed tasks.', isCompleted: false },
  ])('shows status-specific feedback when the $filter tab has no tasks', async ({ filter, expectedMessage, isCompleted }) => {
    const user = userEvent.setup();
    saveToDos(savedToDos.map((toDo) => ({ ...toDo, isCompleted })));
    render(<App />);

    await user.click(screen.getByRole('tab', { name: filter }));

    expect(screen.getByRole('status')).toHaveTextContent(expectedMessage);
    expect(screen.queryByText(/No results for “”./)).not.toBeInTheDocument();
  });

  it('shows grammatical no-result feedback with the searched query and keeps matching results distinct', async () => {
    const user = userEvent.setup();
    saveToDos([savedToDos[0]]);
    render(<App />);

    const search = screen.getByRole('textbox', { name: 'Search ToDos' });
    await user.type(search, 'oatmeal');
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    await user.clear(search);
    await user.type(search, 'Missing');

    expect(screen.getByRole('status')).toHaveTextContent('No results for “Missing”.');
  });

  it('closes add and remove dialogs only when their backdrop is clicked', async () => {
    const user = userEvent.setup();
    saveToDos([savedToDos[0]]);
    render(<App />);

    const addOpener = screen.getByRole('button', { name: 'Add a task' });
    await user.click(addOpener);
    const addDialog = screen.getByRole('dialog', { name: 'Add a task' });
    await user.click(within(addDialog).getByRole('textbox', { name: 'Add your new To-do' }));
    expect(addDialog).toBeInTheDocument();
    await user.click(document.querySelector('.modal-container') as HTMLElement);
    expect(screen.queryByRole('dialog', { name: 'Add a task' })).not.toBeInTheDocument();
    expect(addOpener).toHaveFocus();

    const removeOpener = screen.getByRole('button', { name: 'Remove Make oatmeal' });
    await user.click(removeOpener);
    const removeDialog = screen.getByRole('dialog', { name: 'Remove task' });
    await user.click(within(removeDialog).getByText('Are you sure you want to remove this task?'));
    expect(removeDialog).toBeInTheDocument();
    await user.click(document.querySelector('.modal-container') as HTMLElement);
    expect(screen.queryByRole('dialog', { name: 'Remove task' })).not.toBeInTheDocument();
    expect(removeOpener).toHaveFocus();
  });
});
