import React, { Suspense, useEffect, useState } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { getMovie } from "../../services/themoviedb";
import detailsRoutes from "../../routes/detailsRoutes";
import styles from "./styles.module.scss";

const MovieDetailsPage = ({ location, match, history }) => {
  const [movie, setMovie] = useState();
  const { id } = match.params;
  const defaultLocationState = { goBackTo: "/" };
  const locationState = location.state || defaultLocationState;
  const sections = ["cast", "reviews"];
  const getLocationObject = (section) => ({
    pathname: `${match.url}/${section}`,
    state: locationState,
  });
  const handleButtonClick = () => {
    const location = Object.assign(
      {
        pathname: locationState.goBackTo,
      },
      locationState.filter
        ? {
            search: `?filter=${locationState.filter}`,
          }
        : {}
    );
    history.push(location);
  };

  useEffect(() => {
    getMovie(id).then((data) => setMovie(data));
  }, [id]);

  return (
    <>
      <button className={styles.button} onClick={handleButtonClick}>
        {"<<"}Go Back
      </button>
      {movie && (
        <div className={styles.infoSection}>
          <img src={movie.posterSrc} alt="" />
          <div className={styles.description}>
            <h2>{`${movie.title} (${movie.year})`}</h2>
            <p>User score: {movie.userScore}</p>
            <h4>Overview</h4>
            <p>{movie.overview}</p>
            <h5>Genres</h5>
            <p>{movie.genres}</p>
          </div>
        </div>
      )}
      <hr />
      <p>Additional information</p>
      <ul>
        {sections.map((section) => (
          <li key={section}>
            <NavLink
              to={getLocationObject(section)}
              className={styles.link}
              activeClassName={styles["active-link"]}
            >
              {section}
            </NavLink>
          </li>
        ))}
      </ul>
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {detailsRoutes.map(({ path, component }) => (
            <Route key={path} path={path} component={component} />
          ))}
        </Switch>
      </Suspense>
    </>
  );
};

MovieDetailsPage.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default MovieDetailsPage;
