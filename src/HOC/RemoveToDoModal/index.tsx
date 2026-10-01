import React, { FC } from 'react';
import '../../styles/HOC/_RemoveToDoModal.scss'
import { useDialogFocus } from '../../hooks/useDialogFocus';

type RemoveToDoModalProps = {
    editingToDos: 'add' | 'remove' | '';
    children: JSX.Element | JSX.Element[];
}

export const RemoveToDoModal: FC<RemoveToDoModalProps> = ({ editingToDos, children }: RemoveToDoModalProps) => {
    const dialogRef = useDialogFocus('button[type="button"]');

    return (
        <React.Fragment>
            {editingToDos == 'remove' && (
                <div ref={dialogRef} className='Remove-todo-Modal' role='dialog' aria-modal='true' aria-label='Remove task'>
                    { children }
                </div>)
            }
        </React.Fragment>
    );
}
