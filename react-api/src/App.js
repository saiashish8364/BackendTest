import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  async function fetchData() {
    try {
      const response = await fetch("https://swapi.dev/api/films");
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchData}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
