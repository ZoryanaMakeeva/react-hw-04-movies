import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { getMovies } from "../../services/themoviedb";
import styles from "./styles.module.scss";

const HomePage = ({ location }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies.then((data) => setMovies(data));
  });

  return (
    <>
      <h2 className={styles.heading}>Trending Today</h2>
      <ul>
        {movies &&
          movies.map(({ id, title, name }) => (
            <li key={id}>
              <NavLink
                to={{
                  pathname: `/movies/${id}`,
                  state: {
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

HomePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default HomePage;
