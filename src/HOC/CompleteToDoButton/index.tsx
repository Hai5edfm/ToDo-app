import { FC } from 'react';
import '../../styles/components/_CompleteToDoButton.scss';

type completeToDoProps = {
    toggleToDo: (id: number | string) => void;
    id: number | string;
    isCompleted: boolean;
    children: JSX.Element | JSX.Element[];
}

export const CompleteToDoButton: FC<completeToDoProps> = ({ 
    toggleToDo, 
    id, 
    isCompleted,
    children 
}: completeToDoProps) => {

    return (
        <button className={`complete-to-do-button ${isCompleted ? 'completedButton': ''}`} onClick={() => toggleToDo(id)}>
            { children }
        </button>
    );
}