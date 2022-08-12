import { FC } from 'react';

type RemoveToDoFormProps = {
    removeToDo: (id: number) => void;
    setEditingToDos: React.Dispatch<React.SetStateAction<'add'|'remove'|''>>;
    toDoId: number;
}
export const RemoveToDoForm: FC<RemoveToDoFormProps> = ({ removeToDo, setEditingToDos, toDoId }: RemoveToDoFormProps) => {

    const handleRemove = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        removeToDo(Number(toDoId));
        setEditingToDos('');
    }

    return (
        <form onSubmit={handleRemove} className='remove-todo-container'>
            <label className='remove-todo__label'>
                Are you sure you want to remove this task?
            </label>
                <button className='remove-todo-button remove-todo-button__delete' type='submit'>Yes</button>
                <button className='remove-todo-button remove-todo-button__cancel' type='button' onClick={() => setEditingToDos('')}>No</button>
        </form>
    );
}
