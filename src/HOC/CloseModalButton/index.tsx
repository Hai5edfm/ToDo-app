import { FC } from 'react';

import '../../styles/components/_CloseModalButton.scss';

type AddToDoModalProps = {
    setEditingToDos: React.Dispatch<React.SetStateAction<'add' | 'remove' | ''>>;
    children: JSX.Element | JSX.Element[];
}

export const CloseModalButton: FC<AddToDoModalProps> = ({ setEditingToDos, children}: AddToDoModalProps) => {
    return (
        <button className='close-modal-button' onClick={() => setEditingToDos('')}>
            { children }
        </button>
    );
}

