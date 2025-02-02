import { getPictureUrlFormat } from "../../utils/helper";
import ImageViewer from "../../components/ImageViewer";
import { useState } from "react";

const ShowImages = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <section className="">
      <div className="flex items-center justify-between gap-3 mb-6 border-b border-slate-700 pb-3">
        <h2 className="text-4xl font-semibold ">Photos </h2>
        <span className="text-xl text-slate-400">
          {images.length} {images.length === 1 ? "Photo" : "Photos"}
        </span>
      </div>
      <div className="grid-flow-row grid gap-2">
        <div className="grid grid-flow-col gap-2">
          {images.length >= 0 &&
            images?.slice(0, 2).map((image, index) => (
              <div
                className="aspect-w-16 aspect-h-9 overflow-hidden  cursor-pointer rounded-md"
                key={image.id || index}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={getPictureUrlFormat(image?.file_path, 1280)}
                  alt="backdrop"
                  className="w-full h-full object-cover hover:scale-110 duration-300 transform transition-transform"
                />
              </div>
            ))}
        </div>
        <div className="grid grid-flow-col gap-2">
          {images.length >= 2 &&
            images?.slice(2, 6).map((image, index) => (
              <div
                className="aspect-w-16 aspect-h-9 overflow-hidden  cursor-pointer rounded-md"
                key={image.id || index}
                onClick={() => handleImageClick(index + 3)}
              >
                <img
                  src={getPictureUrlFormat(image?.file_path, 1280)}
                  alt="backdrop"
                  className="w-full h-full object-cover hover:scale-110 duration-300 transform transition-transform"
                />
              </div>
            ))}
        </div>
        <div className="grid grid-flow-col gap-2">
          {images.length >= 6 &&
            images?.slice(6, 10).map((image, index) => (
              <div
                className="aspect-w-16 aspect-h-9 overflow-hidden  cursor-pointer rounded-md"
                key={image.id || index}
                onClick={() => handleImageClick(index + 7)}
              >
                <img
                  src={getPictureUrlFormat(image?.file_path, 1280)}
                  alt="backdrop"
                  className="w-full h-full object-cover hover:scale-110 duration-300 transform transition-transform"
                />
              </div>
            ))}
          {images.length >= 10 && (
            <div className=" cursor-pointer rounded-md relative group">
              <div
                className="absolute top-0 left-0 w-full h-full bg-[#00000073] flex justify-center items-center group-hover:bg-[#000000c7] duration-300 transition-colors"
                onClick={() => handleImageClick(10)}
              >
                <span className="opacity-100 text-white text-4xl group-hover:scale-110 duration-300 transform transition-transform">
                  +{images.length - 10}
                </span>
              </div>
              <img
                src={getPictureUrlFormat(images[10]?.file_path, 1280)}
                alt="backdrop"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
      {selectedImageIndex !== null && (
        <ImageViewer
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </section>
  );
};

export default ShowImages;
