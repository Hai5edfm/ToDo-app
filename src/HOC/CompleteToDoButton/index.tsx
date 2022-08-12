import { FC } from 'react';
import '../../styles/components/_CompleteToDoButton.scss';

type completeToDoProps = {
    toggleToDo: (id: number) => void;
    id: number;
    children: JSX.Element | JSX.Element[];
}

export const CompleteToDoButton: FC<completeToDoProps> = ({ 
    toggleToDo, 
    id, 
    children 
}: completeToDoProps) => {

    return (
        <button className='complete-to-do-button' onClick={() => toggleToDo(id)}>
            { children }
        </button>
    );
}