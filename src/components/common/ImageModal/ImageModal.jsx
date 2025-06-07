import React from "react";
import Modal from "react-modal";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import styles from "./ImageModal.module.css";

const ImageModal = ({
  isOpen,
  onClose,
  image,
  camperName,
  currentIndex,
  totalImages,
  onPrevious,
  onNext,
}) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.modalContent}>
        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <IoClose />
        </button>

        {/* Navigation Buttons */}
        {totalImages > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={onPrevious}
              aria-label="Previous image"
              disabled={currentIndex === 0}
            >
              <IoChevronBack />
            </button>

            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={onNext}
              aria-label="Next image"
              disabled={currentIndex === totalImages - 1}
            >
              <IoChevronForward />
            </button>
          </>
        )}

        {/* Image */}
        <div className={styles.imageContainer}>
          <img
            src={image.original || image.thumb}
            alt={`${camperName} - Image ${currentIndex + 1}`}
            className={styles.image}
          />
        </div>

        {/* Image Counter */}
        {totalImages > 1 && (
          <div className={styles.imageCounter}>
            {currentIndex + 1} / {totalImages}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
