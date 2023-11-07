import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({images, openModal}) => { 
    return (<ul className={css.gallery}>
        {images.length!== 0 && images.map(image =>
            <ImageGalleryItem
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                key={image.id}
                id ={image.id}
                tags={image.tags}
                openModal={openModal}
            />
        )}
</ul>)
}