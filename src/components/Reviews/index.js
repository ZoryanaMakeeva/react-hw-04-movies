import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getReviews } from "../../services/themoviedb";

const Reviews = ({ match }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(match.params.id).then((data) => setReviews(data));
  }, [match.params.id]);

  return (
    <ul>
      {reviews.length
        ? reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))
        : "This film has no reviews"}
    </ul>
  );
};

Reviews.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Reviews;
