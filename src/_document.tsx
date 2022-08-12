import { FC } from 'react';
import ReactDOM from "react-dom";
import './styles/main.scss';

type ModalProps = {
    children: JSX.Element | JSX.Element[];
    showModal: 'add' | 'remove' | '';
}

export const ModalPortal: FC<ModalProps> = ({ children, showModal }: ModalProps) => {
    return ReactDOM.createPortal(
        <div className='modal-container'>
            {children}
        </div>,
        document.getElementById('modal-root') as Element
    )
}

