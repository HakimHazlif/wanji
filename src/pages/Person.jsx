import { usePerson } from "../features/person/usePerson";
import {
  calculateAge,
  formatDateForPerson,
  getProfileImageUrl,
} from "../utils/helper";
import { FiMapPin } from "react-icons/fi";
import { useState } from "react";
import { BiCalendar, BiTrendingUp } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import EmptyPoster from "../components/EmptyPoster";
import { IoMdArrowDropdown } from "react-icons/io";
import PersonWorks from "../components/PersonWorks";

const Person = () => {
  const { isLoading, personDetails, personImages } = usePerson();

  return (
    <main className="padding-x py-20">
      <div className="flex flex-row gap-8 mb-12">
        <div className="">
          <div className="w-[260px] mb-5">
            {personDetails?.profile_path ? (
              <img
                src={getProfileImageUrl(personDetails?.profile_path)}
                alt={personDetails?.name}
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <EmptyPoster size={60} />
            )}
          </div>
          <div className="space-y-3 mb-6">
            {personDetails?.birthday && (
              <div className="flex items-center gap-2">
                <BiCalendar className="text-orange-coral" />
                <span>
                  Born {formatDateForPerson(personDetails?.birthday)}
                  {!personDetails?.deathday &&
                    ` (Age: ${calculateAge(personDetails?.birthday)})`}
                </span>
              </div>
            )}
            {personDetails?.deathday && (
              <div className="flex items-center gap-2">
                <CgCalendarDates className="text-gray-500" />
                <span>
                  Died {formatDateForPerson(personDetails?.deathday)} (Age:{" "}
                  {calculateAge(
                    personDetails?.birthday,
                    personDetails?.deathday
                  )}
                  )
                </span>
              </div>
            )}

            {personDetails?.palceOfBirth && (
              <div className="flex items-center gap-2">
                <FiMapPin className="text-orange-coral" />
                <span>{personDetails?.palceOfBirth}</span>
              </div>
            )}

            {personDetails?.popularity && (
              <div className="flex items-center gap-2">
                <BiTrendingUp className="text-orange-coral" />
                <span>Popularity: {personDetails?.popularity}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{personDetails?.name}</h1>
          {personDetails?.biography && (
            <div>
              <p className="text-gray-300 leading-relaxed">
                {personDetails?.biography}
              </p>
            </div>
          )}
        </div>
      </div>
      <PersonWorks />
    </main>
  );
};

export default Person;
