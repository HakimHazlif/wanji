import { useMemo, useState } from "react";
import { usePerson } from "../hooks/usePerson";
import WorkCard from "./WorkCard";
import EmptyDepartment from "../../../ui/EmptyDepartment";
import WorksControlBar from "./WorksControlBar";
import { usePersonWorksContext } from "../../../context/PersonWorksContext";
import Spinner from "../../../ui/Spinner";
import LoadMoreButton from "../../../components/LoadMoreButton";

const PersonWorks = () => {
  const { activeTab, departmentFilter, sortBy } = usePersonWorksContext();

  const { personDetails, isLoading, castMovies, crewMovies, castTv, crewTv } =
    usePerson();

  const [firstIndex, setFirstIndex] = useState(0);
  const [media, setMedia] = useState([]);

  const filteredWorks = useMemo(() => {
    let works;

    if (departmentFilter === "all") {
      works =
        activeTab === "movies"
          ? [...castMovies, ...crewMovies]
          : [...castTv, ...crewTv];
    } else if (departmentFilter === "Acting") {
      works = activeTab === "movies" ? castMovies : castTv;
    } else {
      const crewWorks = activeTab === "movies" ? crewMovies : crewTv;

      works = crewWorks?.filter((work) => work.department === departmentFilter);
    }

    return works;
  }, [castMovies, crewMovies, castTv, crewTv, activeTab, departmentFilter]);

  const sortedWorks = useMemo(() => {
    const sortedWorks = filteredWorks?.sort((a, b) => {
      switch (sortBy) {
        case "date-latest":
          return (
            new Date(b?.release_date || b?.first_air_date) -
            new Date(a?.release_date || a?.first_air_date)
          );
        case "date-oldest":
          return (
            new Date(a?.release_date || a?.first_air_date) -
            new Date(b?.release_date || b?.first_air_date)
          );
        case "Popularity-high":
          return b?.popularity - a?.popularity;
        case "Popularity-low":
          return a?.popularity - b?.popularity;
        default:
          return (
            new Date(b?.release_date || b?.first_air_date) -
            new Date(a?.release_date || a?.first_air_date)
          );
      }
    });

    setMedia(sortedWorks?.slice(0, 20));
    setFirstIndex(20);
    return sortedWorks;
  }, [filteredWorks, sortBy]);

  function handleGetMoreMedia() {
    const newMedia = sortedWorks?.slice(firstIndex, firstIndex + 20);
    setMedia((prev) => [...prev, ...newMedia]);
    setFirstIndex((prev) => prev + 20);
  }

  console.log({ firstIndex, worksLength: sortedWorks?.length });
  return (
    <section className="space-y-6 ">
      <WorksControlBar />
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="pt-10">
          {media?.length > 0 ? (
            <div>
              <div className="grid grid-flow-row gap-8">
                {media.map((work) => (
                  <WorkCard
                    key={work.credit_id}
                    show={work}
                    category={work["title"] ? "movie" : "tv"}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-10">
                {firstIndex < sortedWorks?.length && (
                  <LoadMoreButton
                    fetchMore={handleGetMoreMedia}
                    isFetching={false}
                  />
                )}
              </div>
            </div>
          ) : (
            <EmptyDepartment name={personDetails?.name} />
          )}
        </section>
      )}
    </section>
  );
};

export default PersonWorks;
