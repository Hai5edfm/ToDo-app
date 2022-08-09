import { useState, useEffect } from 'react';

import { Header } from './HOC/Header';
import { ToDoList } from './HOC/ToDoList';
import { ToDoCounter } from './components/ToDoCounter';
import { AddToDoForm } from './components/AddToDoForm';

import { useToDos } from './hooks/useToDos';

export const App = () => {

  return (
    <div className="App">
      <Header>
        <ToDoCounter />
      </Header>
      <main>
        <ToDoList>

        </ToDoList>
      </main>
    </div>
  )
}

