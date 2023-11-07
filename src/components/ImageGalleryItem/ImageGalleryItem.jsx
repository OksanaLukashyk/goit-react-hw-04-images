import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags, openModal }) => {
    return (
        <li className={css.galleryItem} key={id}>
            <img className={css.galleryItemImg} src={webformatURL} alt={tags} id={id} loading="lazy" onClick={() => openModal({ id, largeImageURL })} /> 
        </li>
    );
};