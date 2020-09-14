import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import qs from "query-string";
import { getMoviesBySearch } from "../../services/themoviedb";
import styles from "./styles.module.scss";

const MoviesPage = ({ history, location }) => {
  const [filter, setFilter] = useState("");
  const [movies, setMovies] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFilter(value);
    history.push({
      ...location,
      search: `filter=${value}`,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getMoviesBySearch(filter).then((d) => setMovies(d));
  };

  useEffect(() => {
    if (location.search) {
      const { filter = "" } = qs.parse(location.search);
      setFilter(filter);
      getMoviesBySearch(filter).then((data) => setMovies(data));
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          value={filter}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies &&
          movies.map(({ id, title, name }) => (
            <li key={id}>
              <NavLink
                to={{
                  pathname: `movies/${id}`,
                  state: {
                    filter,
                    goBackTo: location.pathname,
                  },
                }}
                className={styles.link}
                activeClassName={styles["active-link"]}
              >
                {title || name}
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
};

MoviesPage.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default MoviesPage;
