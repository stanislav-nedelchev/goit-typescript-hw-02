import css from './ImageModal.module.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const ImageModal = ({ openModal, imageModal, closeModal }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName={css.overlay}
    >
      <img
        src={imageModal?.src}
        alt={imageModal?.alt}
        className={css.modalImage}
      />
    </Modal>
  );
};

export default ImageModal;
