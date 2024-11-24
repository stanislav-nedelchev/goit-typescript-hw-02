import './App.css';
import { findImages } from './api/api';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import { Image, ImgModal } from './App.types';

type ApiResponse = { results: Image[]; total: number; total_pages: number };

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean | string>(false);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<null | ImgModal>(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function fetchImages() {
      setIsLoading(true);
      try {
        const data: ApiResponse = await findImages(query, page);
        setImages(previmages => [...previmages, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setErrorMessage((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [query, page]);

  const openModal = (image: ImgModal): void => {
    setModalImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsOpen(false);
  };

  const handleSubmit = (query: string): void => {
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
        <Toaster />
      </div>
    </>
  );
}

export default App;
