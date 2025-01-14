import SearchBar from "./SearchBar";

const Discover = ({ image }) => {
  return (
    <section className="">
      <div className="flex flex-col gap-20 justify-center items-center padding-x leading-relaxed text-center h-[350px] mb-[150px]">
        <p className="font-montserrat font-bold text-white text-2xl lg:px-[250px] md:px-[250px] sm:px-[150px] px-[100px] text-shadow-md">
          and explore a world of movies and shows waiting to be discovered right
          now
        </p>
        <SearchBar />
      </div>

      <div className="absolute top-0 right-0 w-full -z-10 ">
        <img
          src={image}
          alt="backdrop of movie"
          className="h-[550px] w-full object-cover masking"
        />
        <div className="bg-dark h-1/5 w-full absolute bottom-0 right-0 z-10"></div>
      </div>
    </section>
  );
};

export default Discover;
