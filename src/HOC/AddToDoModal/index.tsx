import React, { FC } from 'react';

import '../../styles/HOC/_AddToDoModal.scss'
import { useDialogFocus } from '../../hooks/useDialogFocus';

type AddToDoModalProps = {
    editingToDos: 'add' | 'remove' | '';
    children: JSX.Element | JSX.Element[];
}

export const AddToDoModal: FC<AddToDoModalProps> = ({
    editingToDos,
    children
 }: AddToDoModalProps) => {
    const dialogRef = useDialogFocus('input');

    return (
        <React.Fragment>
            {editingToDos == 'add' && (
                <div ref={dialogRef} className='Add-to-do-Modal' role='dialog' aria-modal='true' aria-label='Add a task'>
                    { children }
                </div>)
            }
        </React.Fragment>
    );
}
