import { useRef, useState } from "react";
import CreditCard from "./CreditCard";

const ProfilesScroll = ({ title, credit }) => {
  const containerRef = useRef(null);

  const newCredit = credit.filter((item, index) => index < 20);

  return (
    <div className="">
      <div>
        <h2 className="mb-5 text-4xl font-semibold">{title}</h2>
        <div className="relative flex items-center px-2 py-4 rounded-lg overflow-hidden text-white">
          <div className="rounded-md bg-[#1d1d26] py-5 w-full px-5 space-x-2 flex gap-2 overflow-x-scroll  scrollbar-custom">
            {newCredit?.map((profile) => (
              <CreditCard
                key={profile.id}
                id={profile.id}
                name={profile.name}
                character={profile.character || profile.job}
                image={profile.profile_path}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesScroll;
