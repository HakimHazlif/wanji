const PlayTrailerButton = ({ handlePlay }) => {
  return (
    <button
      onClick={handlePlay}
      className="px-4 py-2 bg-orange-coral text-white rounded"
    >
      Play Trailer
    </button>
  );
};

export default PlayTrailerButton;
