import { useState } from 'react';
import { Header } from './HOC/Header';
import { ToDoList } from './HOC/ToDoList';
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
import { SearchIcon } from './components/Icons/SearchIcon';
import { FilterToDosOptions, ToDoFilter } from './components/FilterToDosOptions';

export const App = () => {
  if (typeof document !== 'undefined' && window.localStorage.getItem('toDos') === null) {
    window.localStorage.setItem('toDos', JSON.stringify([]));
  }

  const [editingToDos, setEditingToDos] = useState<'add' | 'remove' | ''>('');
  const [selectedFilter, setSelectedFilter] = useState<ToDoFilter>('all');
  const [toDoSelected, setToDoSelected] = useState<number | string>(0);

  const {
    toDos,
    localToDos,
    searchText,
    addToDo,
    removeToDo,
    toggleToDo,
    searchToDo,
    clearSearchText,
    showCompletedToDos,
    showActiveToDos,
    showAllToDos,
  } = useToDos();

  const selectFilter = (filter: ToDoFilter) => {
    setSelectedFilter(filter);
    if (filter === 'pending') {
      showActiveToDos();
    } else if (filter === 'done') {
      showCompletedToDos();
    } else {
      showAllToDos();
    }
  };

  return (
    <div className="App">
      <Header>
        <h1 className="visually-hidden">To-do list</h1>
      </Header>
      <main>
        <ToDoSearchInput
          searchText={searchText}
          searchToDo={searchToDo}
          clearSearchText={clearSearchText}
          searchIcon={(
            <div className="search-to-do__icon" aria-hidden="true">
              <SearchIcon width={24} height={24} fill="#000" />
            </div>
          )}
        />
        <FilterToDosOptions
          selectedFilter={selectedFilter}
          onFilterChange={selectFilter}
        />
        <div
          id="todo-tabpanel"
          role="tabpanel"
          aria-labelledby={`todo-tab-${selectedFilter}`}
          tabIndex={0}
        >
          <ErrorMessage
            toDos={toDos}
            localToDos={localToDos}
            query={searchText}
            selectedFilter={selectedFilter}
            setEditingToDos={setEditingToDos}
          />
          <ToDoList>
            {toDos.map(({ id, text, isCompleted }) => (
              <ToDoCard key={id}>
                <CompleteToDoButton
                  toggleToDo={toggleToDo}
                  id={id}
                  isCompleted={isCompleted}
                  toDoText={text}
                >
                  <MarkAsDoneIcon isCompleted={isCompleted} />
                </CompleteToDoButton>
                <p className={`todo-card__text todo-card__text${isCompleted ? '-completed' : ''}`}> {text} </p>
                <RemoveToDoButton
                  setEditingToDos={setEditingToDos}
                  setToDoSelected={setToDoSelected}
                  toDoId={id}
                  toDoText={text}
                >
                  <CrossIcon width={22} height={22} />
                </RemoveToDoButton>
              </ToDoCard>
            ))}
          </ToDoList>
        </div>

        <AddToDoButton setEditingToDos={setEditingToDos}>
          <AddToDoIcon width={60} height={60} fill="#eee" />
        </AddToDoButton>

        {editingToDos === 'remove' && (
          <ModalPortal showModal={editingToDos} onBackdropClick={() => setEditingToDos('')}>
            <RemoveToDoModal editingToDos={editingToDos}>
              <RemoveToDoForm
                removeToDo={removeToDo}
                setEditingToDos={setEditingToDos}
                toDoId={toDoSelected}
              />
            </RemoveToDoModal>
          </ModalPortal>
        )}
        {editingToDos === 'add' && (
          <ModalPortal showModal={editingToDos} onBackdropClick={() => setEditingToDos('')}>
            <AddToDoModal editingToDos={editingToDos}>
              <CloseModalButton setEditingToDos={setEditingToDos}>
                <CrossIcon width={22} height={22} />
              </CloseModalButton>
              <AddToDoForm addToDo={addToDo} setEditingToDos={setEditingToDos} />
            </AddToDoModal>
          </ModalPortal>
        )}
      </main>
    </div>
  );
};
