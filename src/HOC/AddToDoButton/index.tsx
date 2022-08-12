import { FC } from 'react'

import '../../styles/components/_AddToDoButton.scss'

type AddToDoButtonProps = {
    setEditingToDos: React.Dispatch<React.SetStateAction<'add'|'remove'|''>>;
    children: JSX.Element | JSX.Element[];
}

export const AddToDoButton: FC<AddToDoButtonProps> = ({
    setEditingToDos, 
    children 
}: AddToDoButtonProps) => {
    return (
        <button className='add-to-do-button' onClick={() => setEditingToDos('add')}>
            { children }
        </button>
    );
}