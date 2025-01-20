const MediaCard = ({ item }) => (
  <div className="group relative bg-gray-800/50 rounded-lg overflow-hidden">
    <div className="aspect-[2/3] relative">
      <img
        src={item.poster || "/api/placeholder/300/450"}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-4 w-full">
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <span>{item.year}</span>
            <Rating value={item.rating / 2} />
          </div>
          <h3 className="font-medium text-white line-clamp-2">{item.title}</h3>
        </div>
      </div>
    </div>
  </div>
);

export default MediaCard;
