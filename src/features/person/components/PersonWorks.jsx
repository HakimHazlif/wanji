import { useEffect } from "react";
import { usePerson } from "../hooks/usePerson";
import WorkCard from "./WorkCard";
import EmptyDepartment from "../../../ui/EmptyDepartment";
import WorksControlBar from "./WorksControlBar";
import { usePersonWorksContext } from "../../../context/PersonWorksContext";

const PersonWorks = () => {
  const { activeTab, departmentFilter, sortBy, setWorks, works } =
    usePersonWorksContext();

  const { personMovies, personTv, personDetails } = usePerson();

  useEffect(() => {
    const castMovies = personMovies?.cast || [];
    const crewMovies = personMovies?.crew || [];
    const castTvShows = personTv?.cast || [];
    const crewTvhows = personTv?.crew || [];

    let works;

    if (departmentFilter === "all") {
      works =
        activeTab === "movies"
          ? [...castMovies, ...crewMovies]
          : [...castTvShows, ...crewTvhows];
    } else if (departmentFilter === "Acting") {
      works = activeTab === "movies" ? castMovies : castTvShows;
    } else {
      const crewWorks = activeTab === "movies" ? crewMovies : crewTvhows;

      works = crewWorks?.filter((work) => work.department === departmentFilter);
    }

    const sortWorks = (works) => {
      return works?.sort((a, b) => {
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
    };

    const newWorks = sortWorks(works);

    setWorks(newWorks);
  }, [
    activeTab,
    departmentFilter,
    sortBy,
    personMovies?.cast,
    personMovies?.crew,
    personTv?.cast,
    personTv?.crew,
    setWorks,
  ]);

  return (
    <section className="space-y-6 ">
      <WorksControlBar />
      <section className="pt-10">
        {works?.length > 0 ? (
          <div className="grid grid-flow-row gap-8">
            {works.map((work) => (
              <WorkCard
                key={work.credit_id}
                show={work}
                category={work["title"] ? "movie" : "tv"}
              />
            ))}
          </div>
        ) : (
          <EmptyDepartment name={personDetails?.name} />
        )}
      </section>
    </section>
  );
};

export default PersonWorks;
