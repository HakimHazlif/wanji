import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { movieTags, tvShowTags } from "../constants/filters";

const MediaSectionHeader = ({ title, description, typeTag }) => {
  const [isFilterDrop, setIsFilterDrop] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const buttonRef = useRef();
  const filterRef = useRef();

  const selectedTag = searchParams.get(typeTag);
  const tagOptions = typeTag === "movies-tag" ? movieTags : tvShowTags;

  console.log(tagOptions);

  function handleClick(value) {
    searchParams.set(typeTag, value);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    const handleClosePopup = (e) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsFilterDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClosePopup);

    return () => {
      document.removeEventListener("mousedown", handleClosePopup);
    };
  }, []);

  return (
    <div className="border-b border-slate-700 pb-5 w-full flex items-end justify-between gap-10">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-5 text-base text-slate-400">{description}</p>
      </div>
      <div className="relative">
        <button
          ref={buttonRef}
          className="text-white bg-slate-700 px-5 py-2 rounded-full font-medium flex items-center justify-between gap-3 cursor-pointer text-nowrap"
          onClick={(e) => {
            e.stopPropagation;
            setIsFilterDrop((prev) => !prev);
          }}
        >
          <span>
            {selectedTag
              .split("_")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")}
          </span>
          <IoMdArrowDropdown />
        </button>

        {isFilterDrop && (
          <ul
            className="absolute w-full z-20 top-full right-0 mt-2 bg-slate-700 shadow-lg rounded-lg min-w-28 overflow-auto scrollbar-custom max-h-[300px]"
            ref={filterRef}
          >
            {tagOptions.map((option) => {
              return (
                option.tag !== selectedTag && (
                  <li
                    key={option.tag}
                    className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white"
                    onClick={() => {
                      handleClick(option.tag);
                      setIsFilterDrop(false);
                    }}
                  >
                    {option.label}
                  </li>
                )
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MediaSectionHeader;
