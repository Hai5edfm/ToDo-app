import { Header } from './HOC/Header';
import { ToDoList } from './HOC/ToDoList';
import { ToDoCounter } from './components/ToDoCounter';
import { AddToDoForm } from './components/AddToDoForm';

import { useToDos } from './hooks/useToDos';

import './styles/main.scss';
import { ToDoCard } from './components/ToDoCard';

export const App = () => {
  if(typeof document !== 'undefined' && window.localStorage.getItem("toDos") === null) {
      window.localStorage.setItem("toDos", JSON.stringify([]));
  }

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
          <p> {toDos.length} </p>
        </ToDoCounter>
      </Header>
      <main>
        <ToDoList>
          {toDos.map(({id, text, isCompleted}) => (
            <ToDoCard key={id}>
              <section className='todo-card'>
                {text}
              </section>
            </ToDoCard>
          ))}
        </ToDoList>
        <AddToDoForm addToDo={addToDo} />
      </main>
    </div>
  )
}

