import MediaCard from "../ui/MediaCard";
import { getListTitleAndPath } from "../utils/helper";
import ListScroll from "./ListScroll";

const MediaList = ({ listKey, medias, category }) => {
  const { path, listTitle } = getListTitleAndPath(listKey);

  return (
    <section
      className={`padding-x ${medias?.length > 0 ? "md:pt-32 pt-52" : ""}`}
    >
      {medias?.length > 0 && (
        <ListScroll title={listTitle} path={path} viewAll={true}>
          {medias.map((movie) => {
            return (
              <MediaCard key={movie.id} show={movie} category={category} />
            );
          })}
        </ListScroll>
      )}
    </section>
  );
};

export default MediaList;
