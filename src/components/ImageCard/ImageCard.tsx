import { Image } from './ImageCard.types';

type ImageCardProps = {
  image: Image;
  openModal: (arg: { src: string; alt: string }) => void;
};

const ImageCard = ({ image, openModal }: ImageCardProps) => {
  const handleClick = () => {
    openModal({ src: image.urls.regular, alt: image.alt_description });
  };
  return (
    <img
      src={image.urls.small}
      alt={image.alt_description}
      onClick={handleClick}
    />
  );
};

export default ImageCard;
