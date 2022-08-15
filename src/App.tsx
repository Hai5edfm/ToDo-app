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
import { ModalPortal } from './_document';
import { CloseModalButton } from './HOC/CloseModalButton';
import { CrossIcon } from './components/Icons/CrossIcon';
import { ToDoSearchInput } from './components/ToDoSearchInput';
import { RemoveToDoButton } from './HOC/RemoveToDoButton';
import { RemoveToDoForm } from './components/RemoveToDoForm';
import { RemoveToDoModal } from './HOC/RemoveToDoModal';
import { ErrorMessage } from './components/Error';

export const App = () => {
  if(typeof document !== 'undefined' && window.localStorage.getItem("toDos") === null) {
      window.localStorage.setItem("toDos", JSON.stringify([]));
  }
  const [ editingToDos, setEditingToDos ] = useState<'add'|'remove'|''>('');
  const [ toDoSelected , setToDoSelected ] = useState<number | string>(0);

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
        <ToDoSearchInput searchToDo={searchToDo} showAllToDos={showAllToDos}/>
        <ErrorMessage toDos={toDos} setEditingToDos={setEditingToDos}/>
        <ToDoList>
          {toDos.map(({id, text, isCompleted}) => (
            <ToDoCard key={id}>
              <CompleteToDoButton toggleToDo={toggleToDo} id={id} isCompleted={isCompleted}>
                <MarkAsDoneIcon isCompleted={isCompleted}/>
              </CompleteToDoButton>
              <p className={`todo-card__text todo-card__text${isCompleted ? '-completed' : ''}`}> {text} </p>
              <RemoveToDoButton 
                setEditingToDos={setEditingToDos}
                setToDoSelected={setToDoSelected}
                toDoId={id}>
                <CrossIcon width={22} height={22}/>
              </RemoveToDoButton>
            </ToDoCard>
          ))}
        </ToDoList>
        
        <AddToDoButton setEditingToDos={setEditingToDos}>
          <AddToDoIcon width={60} height={60} fill='#eee'/>
        </AddToDoButton>

        {(editingToDos !== '' && editingToDos === 'remove') && (
          <ModalPortal showModal={editingToDos}>
            <RemoveToDoModal editingToDos={editingToDos}>
              <RemoveToDoForm removeToDo={removeToDo} setEditingToDos={setEditingToDos} toDoId={toDoSelected}/>
            </RemoveToDoModal>
          </ModalPortal> 
        )}
        {(editingToDos !== '' && editingToDos === 'add') && (
          <ModalPortal showModal={editingToDos}>
            <AddToDoModal editingToDos={editingToDos}>
              <CloseModalButton setEditingToDos={setEditingToDos}>
                <CrossIcon width={22} height={22}/>
              </CloseModalButton>
              <AddToDoForm addToDo={addToDo} setEditingToDos={setEditingToDos}/>
            </AddToDoModal>
          </ModalPortal>
        )}

      </main>
    </div>
  )
}

