import { getPictureUrlFormat } from "../../utils/helper";
import { useShow } from "./useShow";

const ShowImages = () => {
  const { images } = useShow();
  // const newEmages = images.filter((image, index) => index <= 20);

  return (
    <section>
      <div className="flex gap-3 items-center mb-6">
        <h2 className="text-4xl text-white">Photos </h2>
        <span className="text-xl text-slate-400">{images.length + 1}</span>
      </div>
      <div className="grid-flow-row grid gap-2">
        <div className="grid grid-flow-col gap-2">
          {images.slice(6, 8).map((image) => (
            <div
              className="aspect-w-16 aspect-h-9 overflow-hidden  cursor-pointer rounded-md"
              key={image.id}
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
          {images.slice(0, 3).map((image) => (
            <div
              className="aspect-w-16 aspect-h-9 overflow-hidden  cursor-pointer rounded-md"
              key={image.id}
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
          {images.slice(3, 6).map((image) => (
            <div
              className="aspect-w-16 aspect-h-9 overflow-hidden  cursor-pointer rounded-md"
              key={image.id}
            >
              <img
                src={getPictureUrlFormat(image?.file_path, 1280)}
                alt="backdrop"
                className="w-full h-full object-cover hover:scale-110 duration-300 transform transition-transform"
              />
            </div>
          ))}
          <div className=" cursor-pointer rounded-md relative ">
            <div className="absolute top-0 left-0 w-full h-full bg-[#00000073] flex justify-center items-center">
              <span className="opacity-100 text-white text-4xl">
                +{images.length - 7}
              </span>
            </div>
            <img
              src={getPictureUrlFormat(images[6]?.file_path, 1280)}
              alt="backdrop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowImages;
