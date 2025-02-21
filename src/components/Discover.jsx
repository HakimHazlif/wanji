import HeaderBackDrop from "../ui/HeaderBackDrop";
import SearchBar from "./SearchBar";

const Discover = ({ image }) => {
  return (
    <section className="padding-x">
      <div className="flex flex-col items-center w-full leading-relaxed text-center">
        <h1 className="font-bold text-3xl max-sm:text-xl font-montserrat text-shadow-md w-full md:w-[460px] sm:w-[500px] mb-5">
          Dive into a world of endless stories
        </h1>
        <p className="font-montserrat font-bold text-2xl max-sm:text-lg text-shadow-md w-full mb-20 md:w-[500px] sm:w-[500px] text-center">
          Explore, rate, and curate your ultimate collection of films and
          series.
        </p>
      </div>
      <SearchBar />

      <HeaderBackDrop backdrop={image} alt="backdrop" />
    </section>
  );
};

export default Discover;
