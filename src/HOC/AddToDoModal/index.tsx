import React, { FC } from 'react';

import '../../styles/HOC/_AddToDoModal.scss'

type AddToDoModalProps = {
    editingToDos: 'add' | 'remove' | '';
    children: JSX.Element | JSX.Element[];
}

export const AddToDoModal: FC<AddToDoModalProps> = ({
    editingToDos,
    children
 }: AddToDoModalProps) => {
    return (
        <React.Fragment>
            {editingToDos == 'add' && (
                <div className='Add-to-do-Modal'>
                    { children }
                </div>)
            }
        </React.Fragment>
    );
}
