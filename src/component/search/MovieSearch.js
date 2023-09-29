import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieSearch.css";
import Pagination from "../pagination/Pagination";
import FallbackImage from "../../image/fallback_image.png";
import Spinner from "../loader/Spinner";
import { Link } from "react-router-dom";
import {
  ALL_BASE_URL,
  IMAGE_BASE_URL,
  SEARCH_BASE_URL,
} from "../config/config";
function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const SEARCH_API = SEARCH_BASE_URL;
  const API_URL = ALL_BASE_URL;

  const getAllMovies = () => {
    axios
      .get(API_URL)
      .then((response) => {
        const movieData = response.data.results;
        setMovies(movieData);
        setTotalResults(response.data.total_results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const changeTheSearch = (event) => {
    setSearch(event.target.value);
  };
  const getSearchedMovies = () => {
    axios
      .get(SEARCH_API + search)
      .then((response) => {
        setMovies(response.data.results);
        setTotalResults(response.data.total_results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const nextPage = (pageNo) => {
    const API_URL = `${ALL_BASE_URL}&page=`;

    axios
      .get(API_URL + pageNo)
      .then((response) => {
        const movieData = response.data.results;
        setMovies(movieData);
        setCurrentPage(pageNo);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // Add a 0.8-second delay before showing the loader
    const timer = setTimeout(() => {
      if (search === "") {
        getAllMovies();
      } else {
        getSearchedMovies();
      }
    }, 800);

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [search]);

  const numberPage = Math.floor(totalResults / 20);

  return (
    <div>
      <div className="navbar">
        <div className="movie-prime">Movies Prime</div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search your favorite movie..."
            className="search-input"
            value={search}
            onChange={changeTheSearch}
          />
        </div>
      </div>
      <div className="popular-movie-container">
        <h1 className="popular-movie">Popular Movies</h1>
      </div>

      {movies.length === 0 ? (
        <Spinner />
      ) : (
        <div className="movie-container">
          {movies.map((movie) => (
            <div className="card" key={movie.id}>
              <Link to={`/${movie.id}`} key={movie.id}>
                {movie.poster_path == null ? (
                  <img
                    style={{ height: "330px", width: "200px" }}
                    src={FallbackImage}
                    alt="fallback"
                  />
                ) : (
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="card-image"
                  />
                )}
              </Link>

              <div className="card-content">
                <h2 className="card-title">{movie.title}</h2>
                <p className="card-release-date">
                  Release Date: {movie.release_date}
                </p>
                <p className="card-release-date">
                  Rating: {movie.vote_average}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-container">
        {totalResults > 20 ? (
          <Pagination
            pages={numberPage}
            nextPage={nextPage}
            currentPage={currentPage}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MovieSearch;
