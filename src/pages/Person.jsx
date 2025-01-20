import { useParams } from "react-router";
import { usePerson } from "../features/person/usePerson";
import { calculateAge, formatDate, getProfileImageUrl } from "../utils/helper";
import { Badge, Box, Tab, Tabs } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { IoTrendingUp } from "react-icons/io5";
import { useState } from "react";

const Person = () => {
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // const handleDepartmentFilter = (event) => {
  //   setDepartmentFilter(event.target.value);
  // };

  const { isLoading, personDetails, personImages, personMovies, personTv } =
    usePerson();

  console.log(personDetails);
  console.log(personImages);
  console.log(personMovies);
  console.log(personTv);

  return (
    <main className="padding-x py-40">
      <section className="flex flex-col md:flex-col gap-8 mb-12">
        <div className="w-full md:w-1/3">
          <div className="relative aspect-[2/3] rounded-2xl overflow-hidden">
            <img
              src={getProfileImageUrl(personDetails?.profile_path)}
              alt={personDetails?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4">
              {personDetails?.knownAs}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{personDetails?.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-400">
              <FaRegCalendarAlt className="w-5 h-5" />
              <span>
                {formatDate(personDetails?.birthday)} (
                {calculateAge(personDetails?.birthday, personDetails?.deathday)}
                )
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 ">
              <FiMapPin className="w-5 h-5" />
              <span>{personDetails?.palceOfBirth}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <IoTrendingUp className="w-5 h-5" />
              <span>Popularity: {personDetails?.popularity.toFixed(1)}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-gray-300">{personDetails?.biography}</p>
          </div>
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">Filmography</h2>

          <div className="flex gap-4">
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              className="bg-bluish-black rounded-md text-white"
            >
              <Select
                value={departmentFilter}
                onChange={setDepartmentFilter}
                className=""
              >
                <MenuItem value="all">All departments</MenuItem>
                <MenuItem value="Acting">Acting</MenuItem>
                <MenuItem value="Directing">Directing</MenuItem>
                <MenuItem value="Writing">Writing</MenuItem>
                <MenuItem value="Creator">Directing</MenuItem>
                <MenuItem value="Production">Directing</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              className="bg-bluish-black rounded-md text-white"
            >
              <Select
                value={sortBy}
                onValueChange={setSortBy}
                id="demo-select-small"
                className=""
              >
                <MenuItem value="date">Release Date</MenuItem>
                <MenuItem value="Popularity">Popularity</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Person;
