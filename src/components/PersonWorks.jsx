import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { usePerson } from "../features/person/usePerson";
import ShowCardRow from "./ShowCardRow";
import WorkCard from "../features/person/WorkCard";

const PersonWorks = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-latest");
  const [works, setWorks] = useState([]);

  const { personMovies, personTv, personDetails } = usePerson();

  const handleChangeTab = (event) => {
    setActiveTab(event.target.value);
  };
  const handleChangeFilter = (event) => {
    setDepartmentFilter(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSortBy(event.target.value);
  };

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

      console.log(works);
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
  ]);

  return (
    <section className="space-y-6 ">
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-700 pb-3">
        <h2 className="text-2xl font-bold">Credits:</h2>

        <div className="flex gap-4">
          <div className="relative flex justify-center items-center">
            <select
              value={activeTab}
              onChange={handleChangeTab}
              className="bg-bluish-black outline-none shadow-none text-white rounded-md py-[10px] px-4 pr-8 appearance-none"
            >
              <option value="movies">Movies</option>
              <option value="tv">TV Shows</option>
            </select>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <IoMdArrowDropdown />
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <select
              value={departmentFilter}
              onChange={handleChangeFilter}
              className="bg-bluish-black outline-none shadow-none text-white rounded-md py-[10px] px-4 pr-8 appearance-none"
            >
              <option value="all">All departments</option>
              <option value="Acting">Acting</option>
              <option value="Directing">Directing</option>
              <option value="Writing">Writing</option>
              <option value="Creator">Creator</option>
              <option value="Production">Production</option>
            </select>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <IoMdArrowDropdown />
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <select
              value={sortBy}
              onChange={handleChangeSort}
              className="bg-bluish-black outline-none shadow-none text-white rounded-md py-[10px] px-4 pr-8 appearance-none"
            >
              <option value="date-latest">Release Date (latest)</option>
              <option value="date-oldest">Release Date (oldest)</option>
              <option value="Popularity-high">Popularity (high)</option>
              <option value="Popularity-low">Popularity (low)</option>
            </select>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <IoMdArrowDropdown />
            </div>
          </div>
        </div>
      </section>

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
          <div className="bg-bluish-black flex justify-center items-center rounded-md w-full h-[200px]">
            <p className="text-gray-300 font-medium">
              <span className="text-orange-amber font-bold">
                {personDetails?.name}
              </span>{" "}
              has no works listed in this department.
            </p>
          </div>
        )}
      </section>
    </section>
  );
};

export default PersonWorks;
