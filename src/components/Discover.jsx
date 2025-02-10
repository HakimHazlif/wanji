import HeaderBackDrop from "../ui/HeaderBackDrop";
import SearchBar from "./SearchBar";

const Discover = ({ image }) => {
  return (
    <section className="">
      <div className="flex flex-col gap-20 justify-end items-center padding-x leading-relaxed text-center h-[200px] mt-32">
        <p className="font-montserrat font-bold text-white text-2xl lg:px-[250px] md:px-[250px] sm:px-[150px] px-[100px] text-shadow-md">
          and explore a world of movies and shows waiting to be discovered right
          now
        </p>
        <SearchBar />
      </div>

      <HeaderBackDrop backdrop={image} alt="backdrop" />
    </section>
  );
};

export default Discover;
