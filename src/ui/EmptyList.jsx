import { RiMovie2AiLine } from "react-icons/ri";

const EmptyList = () => {
  return (
    <section className="mt-5 flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="bg-gray-700 p-6 rounded-full shadow-lg">
          <RiMovie2AiLine className="h-20 w-20 text-purple-600" />
        </div>

        <h2 className="text-2xl font-bold ">No Movies or Shows Found</h2>
        <p className="text-gray-400 max-w-md">
          We couldn&apos;t find any content in your list. Start exploring new
          movies, TV shows, or episodes to fill it up. 🎥🍿
        </p>

        <button
          onClick={() => console.log("Redirect to explore page")}
          className="px-6 py-3 bg-orange-amber rounded-lg shadow-md hover:bg-orange-coral transition text-gray-800 font-semibold"
        >
          Explore Movies & Shows
        </button>
      </div>
    </section>
  );
};

export default EmptyList;
