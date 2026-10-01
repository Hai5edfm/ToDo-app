import { FC } from 'react';
import '../../styles/components/_CompleteToDoButton.scss';

type completeToDoProps = {
    toggleToDo: (id: number | string) => void;
    id: number | string;
    isCompleted: boolean;
    toDoText: string;
    children: JSX.Element | JSX.Element[];
}

export const CompleteToDoButton: FC<completeToDoProps> = ({ 
    toggleToDo, 
    id, 
    isCompleted,
    toDoText,
    children 
}: completeToDoProps) => {

    return (
        <button
            className={`complete-to-do-button ${isCompleted ? 'completedButton': ''}`}
            aria-label={`Mark ${toDoText} as ${isCompleted ? 'pending' : 'complete'}`}
            onClick={() => toggleToDo(id)}
        >
            { children }
        </button>
    );
}