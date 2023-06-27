import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
let timer;
let title, openingText, date;
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        timer = setTimeout(() => {
          fetchData();
        }, 5000);
        throw new Error("Something Went Wrong ....Retrying");
      }
      const data = await response.json();

      const movieData = data.results;
      const transform = movieData.map((obj) => {
        return {
          id: obj.episode_id,
          title: obj.title,
          openingText: obj.opening_crawl,
          releaseDate: obj.release_date,
        };
      });
      setMovies(transform);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  function stopCalling() {
    clearTimeout(timer);
    setError(null);
  }
  function titleChangeHandler(e) {
    title = e.target.value;
  }
  function textChangeHandler(e) {
    openingText = e.target.value;
  }
  function dateChangeHandler(e) {
    date = e.target.value;
  }
  const submitHandler = (e) => {
    e.preventDefault();
    let newMovieObj = {
      title: title,
      openingText: openingText,
      releaseDate: date,
    };
    console.log(newMovieObj);
    document.getElementById("title").value = "";
    document.getElementById("opening-text").value = "";
    document.getElementById("date").value = "";
  };
  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <label>Title</label>
        <br />
        <input type="text" id="title" onChange={titleChangeHandler} />
        <br />
        <label>Opening Text</label>
        <br />
        <input type="text" id="opening-text" onChange={textChangeHandler} />
        <br />
        <label>Release Date</label>
        <br />
        <input type="date" id="date" onChange={dateChangeHandler} />
        <br />
        <button type="submit">Add Movie</button>
      </form>

      <section>
        <button onClick={fetchData}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
        {isLoading && <h1 style={{ fontSize: "2.5rem" }}>Loading...</h1>}
        {!isLoading && error && <h1>{error}</h1>}
        <button onClick={stopCalling}>Cancel</button>
      </section>
    </React.Fragment>
  );
}

export default App;
