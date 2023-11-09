import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { fetchPhotos } from 'services/PixabayApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {

  const [images, setImages] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(``);
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [isLoadMoreShown, setIsloadmoreshown] = useState(false);
  const [isModalShown, setIsmodalshown] = useState(false);
  const [modalImage, setModalimage] = useState(null);
  // const [imgsData, setImgsdata] = useState(null);
  

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsloading(true);
        // setError(null);  
        const data = await fetchPhotos(query, page);
        if (data.hits.length === 0) {
          // setError(error.message);
          setIsloading(false);
          setIsloadmoreshown(false);
          return Notify.failure('Sorry, no results found. Please try again with some another keywords', { timeout: 3000, });
        }

        setImages(prevState => [...prevState, ...data.hits]);
        setIsloadmoreshown(page < Math.ceil(data.totalHits / perPage));
        
        if (page === Math.ceil(data.totalHits / perPage)) {
          setIsloadmoreshown(false);
          return Notify.warning(
            `You've reached the end of search results. Total number of images - ${data.totalHits} `, { timeout: 3000, });
        }
        
      } catch (error) {
        setError(error.message);
      }
      finally {
        setIsloading(false);
      }
    }

    if (query !== '' || page !== 1) {
      fetchImages();
    }

  }, [page, query, perPage, error]);

  const handleSearch = (query) => { 
    setImages([]);
    setQuery(query);
    setPage(1);
  }

  const handleLoadMore = () => {
    setPage(page + 1)
  }

  const openModal = (imgData) => {
    setIsmodalshown(true);
    setModalimage(imgData);
  }

  const closeModal = () => {
    setIsmodalshown(false);
    setModalimage(null);
  }
  
  return (
      <div className="app">
        <Searchbar onSubmit={handleSearch} />
        {error !== null && Notify.failure(`Oops, some error occured... Please try reloading the page`, { timeout: 6000, })}
        {isLoading && <Loader />}
        {images.length !== 0 && <ImageGallery images = {images} openModal={openModal} />}
        {isLoadMoreShown && <Button onClick={handleLoadMore} />}
        {isModalShown && <Modal closeModal={closeModal} imgData={modalImage} /> }
      </div>
  )
}
