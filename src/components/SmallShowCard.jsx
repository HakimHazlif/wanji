import React from "react";
import { formatNumber } from "../utils/functions";
import { lists, heart, bookmark } from "../assets/icons";

const SmallShowCard = (props) => {
  const { id, title, image, rate } = props;

  return (
    <div className="shadow-lg bg-slate-400 text-black rounded-lg w-[200px] pb-4">
      <div className="w-[200px] h-[300px] rounded-t-lg">
        <img src={image} alt="poster" className="rounded-t-lg object-contain" />
      </div>
      <div className="p-4">
        <div className="flex gap-1 items-center mb-2">
          <i className="fa-solid fa-star text-orange-amber"></i>
          <p className="text-sm">{formatNumber(rate)}/10</p>
        </div>
        <div className="w-full">
          <h2 className="text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h2>
        </div>
      </div>
      <div className="flex gap-4 justify-around">
        <button className="w-[40px] h-[40px] rounded-full flex justify-center items-center text-[8px]">
          <img src={lists} alt="icon" className="w-5" />
        </button>
        <button className="w-[40px] h-[40px] rounded-full flex justify-center items-center text-[8px]">
          <img src={heart} alt="icon" className="w-6" fill="#ffffff" />
        </button>
        <button className="w-[40px] h-[40px] rounded-full flex justify-center items-center text-[8px]">
          <img src={bookmark} alt="icon" className="w-[22px]" />
        </button>
      </div>
    </div>
  );
};

export default SmallShowCard;
