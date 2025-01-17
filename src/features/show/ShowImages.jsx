import { getPictureUrlFormat } from "../../utils/helper";
import { useShow } from "./useShow";

const ShowImages = ({ images }) => {
  // const newEmages = images.filter((image, index) => index <= 20);

  return (
    <section className="">
      <div className="flex items-end gap-3 mb-6">
        <h2 className="text-4xl text-white">Photos </h2>
        <span className="text-xl text-slate-400">{images.length}</span>
      </div>
      <div className="grid-flow-row grid gap-2">
        <div className="grid grid-flow-col gap-2">
          {images.length >= 8 &&
            images?.slice(6, 8).map((image, index) => (
              <div
                className="aspect-w-16 aspect-h-9 overflow-hidden  cursor-pointer rounded-md"
                key={image.id || index}
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
          {images.length >= 3 &&
            images?.slice(0, 3).map((image, index) => (
              <div
                className="aspect-w-16 aspect-h-9 overflow-hidden  cursor-pointer rounded-md"
                key={image.id || index}
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
            images?.slice(3, 6).map((image, index) => (
              <div
                className="aspect-w-16 aspect-h-9 overflow-hidden  cursor-pointer rounded-md"
                key={image.id || index}
              >
                <img
                  src={getPictureUrlFormat(image?.file_path, 1280)}
                  alt="backdrop"
                  className="w-full h-full object-cover hover:scale-110 duration-300 transform transition-transform"
                />
              </div>
            ))}
          {images.length === 8 && (
            <div className=" cursor-pointer rounded-md relative ">
              <div className="absolute top-0 left-0 w-full h-full bg-[#00000073] flex justify-center items-center">
                <span className="opacity-100 text-white text-4xl">
                  +{images.length - 7}
                </span>
              </div>
              <img
                src={getPictureUrlFormat(images[8]?.file_path, 1280)}
                alt="backdrop"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShowImages;
