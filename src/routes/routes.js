import { lazy } from "react";

const HomePage = lazy(() =>
  import("../components/HomePage" /* webpackChunkName: "home" */)
);
const MoviesPage = lazy(() =>
  import("../components/MoviesPage" /* webpackChunkName: "movies" */)
);
const MovieDetailsPage = lazy(() =>
  import("../components/MovieDetailsPage" /* webpackChunkName: "movie" */)
);

export default [
  {
    path: "/",
    label: "Home",
    isExact: true,
    isInMenu: true,
    component: HomePage,
  },
  {
    path: "/movies",
    label: "Movies",
    isExact: true,
    isInMenu: true,
    component: MoviesPage,
  },
  {
    path: "/movies/:id",
    label: "Movie",
    isExact: false,
    isInMenu: false,
    component: MovieDetailsPage,
  },
  {
    isExact: false,
    label: "Default",
    isInMenu: false,
    component: HomePage,
  },
];
