import { useSelector } from "react-redux";
import Button from "../components/Button";
import { moviesList } from "../data/showsSlice";
import { useEffect } from "react";

const Discover = ({ content }) => {
  return (
    <section className="relative">
      <div className="absolute flex flex-col justify-center items-center text-center w-full h-full text-size bg-[#4177e454]">
        <div className="flex flex-col gap-10 justify-center items-center lg:px-[350px] md:px-[250px] sm:px-[150px] px-[100px] leading-relaxed">
          <p className="font-montserrat font-bold text-white ">
            and explore a world of movies and shows waiting to be discovered
            right now
          </p>
          <Button
            text="Get Started"
            stylish="bg-orange-amber w-[200px] sm:w-[300px]"
            state=""
            setState=""
          />
        </div>
      </div>
      <div className="w-full h-[450px]">
        <img
          src={content}
          alt="backdrop of movie"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Discover;
