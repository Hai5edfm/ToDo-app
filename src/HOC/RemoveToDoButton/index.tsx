import { FC } from 'react';
import '../../styles/components/_RemoveToDoButton.scss';

type removeToDoProps = {
    setEditingToDos: React.Dispatch<React.SetStateAction<'add'|'remove'|''>>;
    setToDoSelected: React.Dispatch<React.SetStateAction<number | string>>;
    toDoId: number | string;
    children: React.ReactNode;
}

export const RemoveToDoButton: FC<removeToDoProps> = ({
    setEditingToDos,
    setToDoSelected,
    toDoId,
    children 
}: removeToDoProps) => {

    return (
        <button className='remove-to-do-button' onClick={() => {
            setEditingToDos('remove');
            setToDoSelected(toDoId);
            }
        }>
            { children }
        </button>
    );
};
