import { Button } from "@mui/material";

const Discover = ({ image }) => {
  return (
    <section className="">
      <div className="flex flex-col gap-10 justify-center items-center lg:px-[350px] md:px-[250px] sm:px-[150px] px-[100px] leading-relaxed text-center h-[500px]">
        <p className="font-montserrat font-bold text-white text-2xl">
          and explore a world of movies and shows waiting to be discovered right
          now
        </p>
        <Button stylish="py-3 px-5 text-white text-xl sm:text-2xl font-medium font-roboto rounded-full bg-orange-amber max-w-[250px] w-[200px] min-w-[150px] sm:w-[300px]">
          Get Started
        </Button>
      </div>

      <div className="absolute top-0 right-0 w-full -z-50 h-[550px]">
        <img
          src={image}
          alt="backdrop of movie"
          className="h-full w-full object-cover"
        />
        <div className="bg-[#3575f54f] h-full w-full absolute top-0 right-0 z-10"></div>
      </div>
    </section>
  );
};

export default Discover;
