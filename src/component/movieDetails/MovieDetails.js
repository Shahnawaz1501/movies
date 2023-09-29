import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL_FULL } from "../config/config";
const MovieDetails = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  return (
    <div className="movie">
      <div className="movie-intro">
        <img
          className="movie-backdrop"
          src={`${IMAGE_BASE_URL_FULL}${
            currentMovieDetail && currentMovieDetail.backdrop_path
          }`}
        />
      </div>
      <div className="movie-detail">
        <div className="movie-detail-left">
          <div>
            <img
              className="movie-poster"
              src={`${IMAGE_BASE_URL_FULL}${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie-detail-right">
          <div className="movie-detail-right-top">
            <div className="movie-name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie-tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie-rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}
              <span className="movie-vote-count">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie-run-time">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie-release-date">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
          </div>
          <div className="movie-detail-right-bottom">
            <div className="synopsis-text">Movie Overview</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
