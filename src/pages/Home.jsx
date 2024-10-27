import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowsList, moviesList, showsStatus } from "../data/showsSlice.js";
import Discover from "../sections/Discover.jsx";
import { getBackdrop } from "../utils/functions.js";
import ShowsList from "../sections/ShowsList.jsx";
import { resetStatus } from "../data/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  const shows = useSelector(moviesList);
  const showStatus = useSelector(showsStatus);

  useEffect(() => {
    if (showStatus === "idle") {
      dispatch(fetchShowsList());
    }
    dispatch(resetStatus());
  }, [showStatus, dispatch]);

  let content;
  if (showStatus === "succeeded") {
    content = getBackdrop(shows[0].backdrop_path);
  }

  return (
    <main>
      <Discover content={content} />
      <ShowsList type="movies" />
      <ShowsList type="series" />
    </main>
  );
};

export default Home;
