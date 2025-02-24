// components/ImageViewer.jsx
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { getPictureUrlFormat } from "../utils/helper";

const ImageViewer = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentIndex];
  const aspectRatio = (currentImage.width / currentImage.height).toFixed(3);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute z-30 top-4 right-4 text-white hover:text-orange-amber p-2"
      >
        <IoMdClose size={30} />
      </button>

      <button
        onClick={handlePrevious}
        className="absolute z-30 left-4 text-white hover:text-orange-amber p-2"
      >
        <IoIosArrowBack size={40} />
      </button>

      <div className="relative max-w-[90vw] max-h-[90vh] flex justify-center items-center">
        <img
          src={getPictureUrlFormat(currentImage.file_path)}
          alt={`Image ${currentIndex + 1}`}
          style={{
            maxWidth: "100%",
            maxHeight: "90vh",
            aspectRatio: aspectRatio,
            objectFit: "contain",
          }}
        />
        <div className="absolute bottom-[-30px] text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="absolute z-30 right-4 text-white hover:text-orange-amber p-2"
      >
        <IoIosArrowForward size={40} />
      </button>
    </div>
  );
};

export default ImageViewer;
