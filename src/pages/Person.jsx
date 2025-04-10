import { usePerson } from "../features/person/usePerson";
import {
  calculateAge,
  formatDateForPerson,
  getPictureUrlFormat,
  getProfileImageUrl,
} from "../utils/helper";
import { FiMapPin } from "react-icons/fi";
import { useState } from "react";
import { BiCalendar, BiTrendingUp } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import EmptyPoster from "../components/EmptyPoster";
import { IoMdArrowDropdown } from "react-icons/io";
import PersonWorks from "../components/PersonWorks";
import HeaderBackDrop from "../ui/HeaderBackDrop";

const Person = () => {
  const [isReadMore, setIsReadMore] = useState(false);
  const { isLoading, personDetails, personImages } = usePerson();

  return (
    <main className="padding-x pb-20">
      <div className="mb-20">
        <div className="flex items-end sm:gap-8 gap-2">
          <div className="w-[260px]">
            {personDetails?.profile_path ? (
              <img
                src={getProfileImageUrl(personDetails?.profile_path, 1280)}
                alt={personDetails?.name}
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <EmptyPoster size={60} />
            )}
          </div>
          <div className="space-y-3 font-medium text-shadow-md md:text-lg sm:text-md xs:text-base text-sm text-slate-200">
            <h1 className="heading-title font-bold mb-4 text-shadow-md text-white">
              {personDetails?.name}
            </h1>
            {personDetails?.birthday && (
              <div className="flex items-start gap-2">
                <BiCalendar className="text-amber-200 text-2xl" />
                <span>
                  Born {formatDateForPerson(personDetails?.birthday)}
                  {!personDetails?.deathday &&
                    ` (Age: ${calculateAge(personDetails?.birthday)})`}
                </span>
              </div>
            )}
            {personDetails?.deathday && (
              <div className="flex items-start gap-2">
                <CgCalendarDates className="text-amber-200 text-2xl" />
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
              <div className="flex items-start gap-2">
                <FiMapPin className="text-amber-200 text-2xl" />
                <span>{personDetails?.palceOfBirth}</span>
              </div>
            )}

            {personDetails?.popularity && (
              <div className="flex items-center gap-2">
                <BiTrendingUp className="text-amber-200 text-2xl" />
                <span>Popularity: {personDetails?.popularity}</span>
              </div>
            )}
          </div>
        </div>

        {personDetails?.biography && (
          <div className="flex-1 mt-10">
            <div>
              <p
                className={`w-full text-base text-gray-300 leading-relaxed ${
                  isReadMore ? "space-y-4" : "line-clamp-4"
                }`}
              >
                {personDetails?.biography}
              </p>
              {personDetails?.biography.length > 300 && (
                <button
                  onClick={() => setIsReadMore(!isReadMore)}
                  className="mt-5 text-slate-400 hover:text-white font-medium ml-auto block transition-colors duration-200"
                >
                  {isReadMore ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <PersonWorks />
      <HeaderBackDrop
        backdrop={getPictureUrlFormat(personImages?.[1]?.file_path, 1280)}
        alt="backdrop"
      />
    </main>
  );
};

export default Person;
