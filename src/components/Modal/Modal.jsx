import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ closeModal, imgData }) => {

    const closeOnOverlayClick = (evt) => {
        if (evt.target === evt.currentTarget) {
            closeModal();
        }
    };

    useEffect(() => {
        const closeOnEsc = (evt) => {
        if (evt.code === "Escape") {
            closeModal();
        }
        };
        
        window.addEventListener('keydown', closeOnEsc);
        document.body.style.overflow = 'hidden';
        
        return () => {
        window.removeEventListener('keydown', closeOnEsc);
        document.body.style.overflow = 'auto';}
    }, [closeModal]);

    return (
            <div className={css.overlay} onClick={closeOnOverlayClick}>
                <div className={css.modal}>
                    <img className={css.modalImg} src={imgData.largeImageURL} alt={imgData.tags}  />
                </div>
            </div>
    );
}
