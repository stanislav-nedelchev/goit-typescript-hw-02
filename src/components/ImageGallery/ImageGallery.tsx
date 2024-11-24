import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Image } from './ImageGallery.types';

type ImageGalleryProps = {
  images: Image[];
  openModal: (arg: { src: string; alt: string }) => void;
};

const ImageGallery = ({ images, openModal }: ImageGalleryProps) => {
  return (
    <ul className={css.imageGalleryList}>
      {images.map(image => (
        <li key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
