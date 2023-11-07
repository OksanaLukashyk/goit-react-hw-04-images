import React, { Component } from 'react';
import { Notify } from 'notiflix';
import { fetchPhotos } from 'services/PixabayApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {

  state = {
    images: [],
    isLoading: false,
    error: null,
    query: ``,
    page: 1,
    perPage: 12,
    isloadMoreShown: false,
    isModalShown: false,
    modalImage: null,
    imgsData: null,
  }

  async componentDidUpdate(_, prevState) {
    const { query, page, perPage } = this.state;

    if (page !== prevState.page || query !== prevState.query) {
      try {
        this.setState({ isLoading: true, error: null });
        const data = await fetchPhotos(query, page);
        if (data.hits.length === 0) {
          this.setState({ isLoading: false, isloadMoreShown: false});
          return Notify.failure('Sorry, no results found. Please try again with some another keywords', { timeout: 3000, });
        }

        this.setState(prevState => ({ images: [...prevState.images, ...data.hits], isloadMoreShown: page < Math.ceil(data.totalHits / perPage) }));
        
        if (page === Math.ceil(data.totalHits / perPage)) { 
          this.setState({ isloadMoreShown: false});
          return Notify.warning(
            `You've reached the end of search results. Total number of images - ${data.totalHits} `, { timeout: 3000, });
        }
        
      } catch (error) {
         this.setState({ error: error.message });
      }
      finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = (query) => { 
    this.setState({ images: [], query:query, page:1 });
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  openModal = (imgData) => {
    this.setState({
      isModalShown: true,
      modalImage: imgData,
    });
  }

  closeModal = () => {
    this.setState({
      isModalShown: false,
      modalImage: null,
    });
  }

  render() {
    const { images, isLoading, error, isModalShown, isloadMoreShown, modalImage } = this.state;
    
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearch} />
        {error !== null && Notify.failure(`Oops, some error occured... Please try reloading the page`, { timeout: 6000, })}
        {isLoading && <Loader />}
        {images.length !== 0 && <ImageGallery images = {images} openModal={this.openModal} />}
        {isloadMoreShown && <Button onClick={this.handleLoadMore} />}
        {isModalShown && <Modal closeModal={this.closeModal} imgData={modalImage} /> }
      </div>
    )
  }
}
