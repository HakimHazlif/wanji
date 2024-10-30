import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShow, showData, showStatus } from "../data/movieSlice";
import { AppContext } from "../Context/AppProvider";
import ShowDetails from "../sections/ShowDetails";
import ShowCredite from "../sections/ShowCredite";
import ShowSimilar from "../sections/ShowSimilar";
import ShowReviews from "../sections/ShowReviews";
import { useParams } from "react-router-dom";

const Show = ({ isMovie }) => {
  const dispatch = useDispatch();
  const status = useSelector(showStatus);

  const { id } = useParams();
  const showId = id;

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
    content = (
      <div className="padding-x">
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

  return <div className="py-10">{content}</div>;
};

export default Show;
