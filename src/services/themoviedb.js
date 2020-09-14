import axios from "axios";
import key from "./key";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  method: "get",
  params: {
    api_key: key,
    language: "en-US",
  },
});

const getMovies = instance
  .get(`/trending/all/day`)
  .then((data) => data.data.results);

const getMoviesBySearch = (query) =>
  instance
    .get(`/search/movie?page=1&include_adult=false&query=${query}`)
    .then((data) => data.data.results);

const getMovie = (movie_id) =>
  instance.get(`/movie/${movie_id}`).then((result) => {
    const { data } = result;
    return {
      title: data.title || "",
      posterSrc: data.poster_path
        ? `https://image.tmdb.org/t/p/w185/${data.poster_path}`
        : "",
      year: data.release_date ? new Date(data.release_date).getFullYear() : "",
      userScore: data.vote_average ? `${data.vote_average * 10}%` : "",
      overview: data.overview || "",
      genres: data.genres
        ? data.genres.map((genre) => genre.name).join(" ")
        : "",
    };
  });

const getCast = (movie_id) =>
  instance.get(`/movie/${movie_id}/credits`).then((data) => data.data.cast);

const getReviews = (movie_id) =>
  instance.get(`/movie/${movie_id}/reviews`).then((data) => data.data.results);

export { getMoviesBySearch, getMovies, getMovie, getCast, getReviews };
