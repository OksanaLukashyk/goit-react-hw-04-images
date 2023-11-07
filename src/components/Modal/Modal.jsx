import React, { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.closeOnEsc);
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeOnEsc);
        document.body.style.overflow = 'scroll';
    }

    closeOnOverlayClick = (evt) => {
        if (evt.target === evt.currentTarget) { 
            this.props.closeModal();
        }
    }

    closeOnEsc = (evt) => {
        if (evt.code === "Escape") { 
            this.props.closeModal();
        }
    }

    render() {
        const { imgData } = this.props;

        return (
            <div className={css.overlay} onClick={this.closeOnOverlayClick}>
                <div className={css.modal}>
                    <img className={css.modalImg} src={imgData.largeImageURL} alt={imgData.tags}  />
                </div>
            </div>
        );
    }
}
