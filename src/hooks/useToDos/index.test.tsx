import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useToDos } from './index';
import type { ToDo } from '@src/customTypes/ToDo';

const savedToDos: ToDo[] = [
  { id: 'milk', text: 'Buy milk', isCompleted: false },
  { id: 'laundry', text: 'Wash laundry', isCompleted: true },
  { id: 'tea', text: 'Buy tea', isCompleted: false },
];

const saveToDos = (toDos: ToDo[]) => {
  window.localStorage.setItem('toDos', JSON.stringify(toDos));
};

describe('useToDos', () => {
  beforeEach(() => {
    saveToDos(savedToDos);
  });

  it('loads persisted tasks from local storage', () => {
    const { result } = renderHook(() => useToDos());

    expect(result.current.toDos).toEqual(savedToDos);
    expect(result.current.localToDos).toEqual(savedToDos);
  });

  it('adds and persists a new active task', () => {
    const { result } = renderHook(() => useToDos());

    act(() => result.current.addToDo('Read a book'));

    const persisted = JSON.parse(window.localStorage.getItem('toDos') || '[]') as ToDo[];
    expect(result.current.toDos).toHaveLength(4);
    expect(result.current.toDos[3]).toMatchObject({ text: 'Read a book', isCompleted: false });
    expect(result.current.toDos[3].id).toEqual(expect.any(String));
    expect(persisted).toEqual(result.current.toDos);
  });

  it('toggles completion and removes tasks in persisted state', () => {
    const { result } = renderHook(() => useToDos());

    act(() => result.current.toggleToDo('milk'));
    expect(result.current.toDos[0].isCompleted).toBe(true);
    expect(JSON.parse(window.localStorage.getItem('toDos') || '[]')).toEqual(result.current.toDos);

    act(() => result.current.removeToDo('laundry'));
    expect(result.current.toDos.map(({ id }) => id)).toEqual(['milk', 'tea']);
    expect(JSON.parse(window.localStorage.getItem('toDos') || '[]')).toEqual(result.current.toDos);
  });

  it('searches case-insensitively and filters the saved task list', () => {
    const { result } = renderHook(() => useToDos());

    act(() => result.current.searchToDo('TEA'));
    expect(result.current.toDos.map(({ id }) => id)).toEqual(['tea']);

    act(() => result.current.showCompletedToDos());
    expect(result.current.toDos.map(({ id }) => id)).toEqual(['laundry']);

    act(() => result.current.showActiveToDos());
    expect(result.current.toDos.map(({ id }) => id)).toEqual(['milk', 'tea']);

    act(() => result.current.showAllToDos());
    expect(result.current.toDos).toEqual(savedToDos);
  });
});
