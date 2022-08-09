import { FC, useState } from 'react';

type addToDoProps = {
  addToDo: (text: string) => void;
}

export const AddToDoForm: FC<addToDoProps> = ({ addToDo }: addToDoProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToDo(text);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo-container">
      <input type="text" placeholder="Add a new ToDo" className="add-todo-input"/>
      <button type="submit" className="add-todo-button">Add</button>
    </form>
  )
}

