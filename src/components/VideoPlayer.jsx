import { useState } from "react";
import { IoClose } from "react-icons/io5";

const VideoPlayer = ({
  videoData,
  onClose,
  autoplay = true,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!videoData || !videoData.key || videoData.site !== "YouTube") {
    return null;
  }

  const videoUrl = `https://www.youtube.com/embed/${videoData.key}?autoplay=${
    autoplay ? 1 : 0
  }&rel=0`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-4xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 p-2 text-white hover:text-orange-coral transition-colors"
          aria-label="Close video"
        >
          <IoClose size={24} />
        </button>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-bluish-black">
            <div className="w-12 h-12 border-4 border-orange-coral border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="relative pt-[56.25%]">
          <iframe
            src={videoUrl}
            className="absolute inset-0 w-full h-full rounded-lg"
            title={videoData.name || "Video Player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
