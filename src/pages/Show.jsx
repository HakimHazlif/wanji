import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShow, showData, showStatus } from "../data/movieSlice";
import { AppContext } from "../Context/AppProvider";
import ShowDetails from "../sections/ShowDetails";
import ShowCredite from "../sections/ShowCredite";
import ShowSimilar from "../sections/showSimilar";
import ShowReviews from "../sections/ShowReviews";

const Show = () => {
  const { isMovie, showId, setShowId } = useContext(AppContext);
  const dispatch = useDispatch();
  const status = useSelector(showStatus);
  const show = useSelector(showData);

  console.log(isMovie, showId);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchShow({ isMovie, showId }));
    }
  }, [isMovie, showId, dispatch, status]);

  let content;
  if (status === "loading") {
    content = <div>Loading...</div>;
  }
  if (status === "succeeded") {
    console.log(show);
    content = (
      <div>
        <ShowDetails />
        <ShowCredite />
        <ShowSimilar />
        <ShowReviews />
      </div>
    );
  }
  if (status === "failed") {
    content = <div>Database connection failed</div>;
  }

  return <div>{content}</div>;
};

export default Show;
