import { FC } from 'react';
import ReactDOM from "react-dom";
import './styles/main.scss';

type ModalProps = {
    children: JSX.Element | JSX.Element[];
    showModal: 'add' | 'remove' | '';
    onBackdropClick: () => void;
}

export const ModalPortal: FC<ModalProps> = ({ children, showModal, onBackdropClick }: ModalProps) => {
    return ReactDOM.createPortal(
        <div
            className='modal-container'
            onClick={event => {
                if (event.target === event.currentTarget) {
                    onBackdropClick();
                }
            }}
        >
            {children}
        </div>,
        document.getElementById('modal-root') as Element
    )
}

