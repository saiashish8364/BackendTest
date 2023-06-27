import React, { useCallback, useEffect } from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const deleteMovieHandler = useCallback(async function (e) {
    await fetch(
      `https://react-backend-test-1-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${e.target.id}.json`,
      {
        method: "DELETE",
      }
    );
  }, []);
  useEffect(() => {}, [deleteMovieHandler]);
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button id={props.id} onClick={deleteMovieHandler}>
        Delete Movie
      </button>
    </li>
  );
};

export default Movie;
