const ImageCard = ({ image, openModal }) => {
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
