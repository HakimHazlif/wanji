import { getPictureUrlFormat } from "../../utils/helper";

const ShowImages = ({ images }) => {
  const newEmages = images.filter((image, index) => index <= 20);

  console.log(images);

  return (
    <div className="px-40 py-28">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={getPictureUrlFormat(images[1].file_path, 1280)}
                alt="backdrop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={getPictureUrlFormat(images[2].file_path, 1280)}
                  alt="backdrop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={getPictureUrlFormat(images[3].file_path, 1280)}
                  alt="backdrop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={getPictureUrlFormat(images[0].file_path, 1280)}
                alt="backdrop"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={getPictureUrlFormat(images[10].file_path, 1280)}
                alt="backdrop"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={getPictureUrlFormat(images[11].file_path, 1280)}
                alt="backdrop"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {images.slice(5, 9).map((img) => (
            <div key={img.file_path} className="aspect-w-16 aspect-h-9">
              <img
                src={getPictureUrlFormat(img.file_path, 1280)}
                alt="backdrop"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowImages;
