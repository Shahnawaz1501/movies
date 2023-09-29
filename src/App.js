import React from "react";
import MovieSearch from "./component/search/MovieSearch";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetails from "./component/movieDetails/MovieDetails";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
