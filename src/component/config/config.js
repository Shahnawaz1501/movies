const API_URL = "https://api.themoviedb.org/3/";
const API_KEY="04c35731a5ee918f014970082a0088b1";


const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const ALL_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;


const IMAGE_BASE_URL="https://image.tmdb.org/t/p/w300"

const IMAGE_BASE_URL_FULL="https://image.tmdb.org/t/p/original"

export {
    API_URL,
    API_KEY,
    SEARCH_BASE_URL,
    ALL_BASE_URL,
    IMAGE_BASE_URL,
    IMAGE_BASE_URL_FULL
};
