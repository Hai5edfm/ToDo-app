import React, { FC } from 'react';
import '../../styles/HOC/_RemoveToDoModal.scss'

type RemoveToDoModalProps = {
    editingToDos: 'add' | 'remove' | '';
    children: JSX.Element | JSX.Element[];
}

export const RemoveToDoModal: FC<RemoveToDoModalProps> = ({ editingToDos, children }: RemoveToDoModalProps) => {

    return (
        <React.Fragment>
            {editingToDos == 'remove' && (
                <div className='Remove-todo-Modal'>
                    { children }
                </div>)
            }
        </React.Fragment>
    );
}
