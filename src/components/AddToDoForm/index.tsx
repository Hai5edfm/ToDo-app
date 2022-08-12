import { FC, useState } from 'react';

type addToDoProps = {
  addToDo: (text: string) => void;
  setEditingToDos: React.Dispatch<React.SetStateAction<'add' | 'remove' | ''>>;
}

export const AddToDoForm: FC<addToDoProps> = ({ addToDo, setEditingToDos }: addToDoProps) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = document.getElementById('add-todo-input') as HTMLInputElement;

    addToDo(newTodo.value);
    newTodo.value = '';

    setEditingToDos('');
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo-container">
      <label htmlFor='add-todo-input' className='add-todo-input__label'>Add your new To-do</label>
      <input id="add-todo-input" className="add-todo-input" type="text" placeholder="Add a new ToDo"/>
      <button type="submit" className="add-todo-button">Add</button>
    </form>
  )
}

