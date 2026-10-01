import { render, screen } from '@testing-library/react';
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
  it('renders the empty-list state', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'You have 0 tasks pending' })).toBeInTheDocument();
    expect(screen.getByText(/haven't added any toDos yet/i)).toBeInTheDocument();
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
    expect(screen.getByRole('heading', { name: 'You have 1 tasks pending' })).toBeInTheDocument();
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

  it('searches tasks and displays all, active, or completed tasks', async () => {
    const user = userEvent.setup();
    saveToDos(savedToDos);
    render(<App />);

    const search = screen.getByRole('textbox', { name: 'Search ToDos' });
    await user.type(search, 'tea');
    expect(screen.getByText('Make tea')).toBeInTheDocument();
    expect(screen.queryByText('Make oatmeal')).not.toBeInTheDocument();

    await user.clear(search);
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Finish report')).toBeInTheDocument();

    search.closest('form')?.addEventListener('click', event => {
      if ((event.target as HTMLElement).closest('button')) {
        event.preventDefault();
      }
    });
    await user.click(document.querySelector('button.filter-button')!);
    await user.click(screen.getByRole('button', { name: 'Completed' }));
    expect(screen.getByText('Finish report')).toBeInTheDocument();
    expect(screen.queryByText('Make oatmeal')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Active' }));
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.queryByText('Finish report')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Make oatmeal')).toBeInTheDocument();
    expect(screen.getByText('Finish report')).toBeInTheDocument();
    expect(screen.getByText('Make tea')).toBeInTheDocument();
  });

  it('shows no-result feedback when a search does not match saved tasks', async () => {
    const user = userEvent.setup();
    saveToDos([savedToDos[0]]);
    render(<App />);

    await user.type(screen.getByRole('textbox', { name: 'Search ToDos' }), 'Missing');

    expect(screen.getByRole('heading', { name: 'There is no results for Missing' })).toBeInTheDocument();
  });
});
