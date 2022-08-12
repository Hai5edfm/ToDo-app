import { useState } from 'react';
import { Header } from './HOC/Header';
import { ToDoList } from './HOC/ToDoList';
import { ToDoCounter } from './HOC/ToDoCounter';
import { AddToDoForm } from './components/AddToDoForm';

import { useToDos } from './hooks/useToDos';

import { ToDoCard } from './HOC/ToDoCard';
import { MarkAsDoneIcon } from './components/Icons/MarkAsDoneIcon';
import { CompleteToDoButton } from './HOC/CompleteToDoButton';
import { AddToDoButton } from './HOC/AddToDoButton';
import { AddToDoIcon } from './components/Icons/AddToDoIcon';

import './styles/main.scss';
import { AddToDoModal } from './HOC/AddToDoModal';

export const App = () => {
  if(typeof document !== 'undefined' && window.localStorage.getItem("toDos") === null) {
      window.localStorage.setItem("toDos", JSON.stringify([]));
  }
  const [ editingToDos, setEditingToDos ] = useState<'add'|'remove'|''>('');  
  const {
    toDos,
    addToDo,
    removeToDo,
    toggleToDo,
    searchToDo,
    showCompletedToDos,
    showActiveToDos,
    showAllToDos,
  } = useToDos();

  return (
    <div className="App">
      <Header>
        <ToDoCounter>
          <h1 className='to-do-counter'> You have {toDos.length} tasks pending</h1>
        </ToDoCounter>
      </Header>
      <main>
        <ToDoList>
          {toDos.map(({id, text, isCompleted}) => (
            <ToDoCard key={id}>
              <CompleteToDoButton toggleToDo={toggleToDo} id={id}>
                <MarkAsDoneIcon isCompleted={isCompleted}/>
              </CompleteToDoButton>
              <p className={`todo-card__text todo-card__text${isCompleted ? '-completed' : ''}`}> {text} </p>
            </ToDoCard>
          ))}
        </ToDoList>
        
        <AddToDoButton setEditingToDos={setEditingToDos}>
          <AddToDoIcon width={60} height={60} fill='#eee'/>
        </AddToDoButton>

        <AddToDoModal editingToDos={editingToDos}>
          <AddToDoForm addToDo={addToDo} />
        </AddToDoModal>
      </main>
    </div>
  )
}

