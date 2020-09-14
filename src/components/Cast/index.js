import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCast } from "../../services/themoviedb";

const Cast = ({ match }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getCast(match.params.id).then((data) => setCast(data));
  }, [match.params.id]);

  return (
    <ul>
      {cast.map(({ profile_path, name, character }) => (
        <div key={profile_path + Math.random()}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w92${profile_path}`
                : ""
            }
            alt=""
          />
          <li>
            <p>{name}</p>
            <p>Character: {character}</p>
          </li>
        </div>
      ))}
    </ul>
  );
};

Cast.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Cast;
