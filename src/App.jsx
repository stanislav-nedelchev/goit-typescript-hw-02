import './App.css';
import { findImages } from './api/api';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function fetchImages() {
      setIsLoading(true);
      try {
        const data = await findImages(query, page);
        setImages(previmages => [...previmages, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [query, page]);

  const openModal = image => {
    setModalImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsOpen(false);
  };

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
  };

  const handleClick = () => {
    setPage(prevpage => prevpage + 1);
  };

  return (
    <>
      <div>
        <SearchBar onSubmit={handleSubmit} />
        <ImageGallery images={images} openModal={openModal} />
        <ImageModal
          openModal={modalIsOpen}
          imageModal={modalImage}
          closeModal={closeModal}
        />
        {page < totalPages && <LoadMoreBtn onClick={handleClick} />}
        {isLoading && <Loader />}
        {errorMessage && <ErrorMessage />}
        <Toaster toast={toast} />
      </div>
    </>
  );
}

export default App;
