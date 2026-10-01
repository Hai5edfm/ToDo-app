import { FC } from 'react';
import '../../styles/components/_RemoveToDoButton.scss';

type removeToDoProps = {
    setEditingToDos: React.Dispatch<React.SetStateAction<'add'|'remove'|''>>;
    setToDoSelected: React.Dispatch<React.SetStateAction<number | string>>;
    toDoId: number | string;
    toDoText: string;
    children: React.ReactNode;
}

export const RemoveToDoButton: FC<removeToDoProps> = ({
    setEditingToDos,
    setToDoSelected,
    toDoId,
    toDoText,
    children 
}: removeToDoProps) => {

    return (
        <button className='remove-to-do-button' aria-label={`Remove ${toDoText}`} onClick={() => {
            setEditingToDos('remove');
            setToDoSelected(toDoId);
            }
        }>
            { children }
        </button>
    );
};
