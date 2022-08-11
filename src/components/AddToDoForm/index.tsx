import { FC, useState } from 'react';

type addToDoProps = {
  addToDo: (text: string) => void;
}

export const AddToDoForm: FC<addToDoProps> = ({ addToDo }: addToDoProps) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = document.getElementById('new-todo') as HTMLInputElement;

    addToDo(newTodo.value);
    newTodo.value = '';
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo-container">
      <label>Add your new To-do</label>
      <input id="new-todo" className="new-todo" type="text" placeholder="Add a new ToDo"/>
      <button type="submit" className="add-todo-button">Add</button>
    </form>
  )
}

