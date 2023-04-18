import React from "react";
import { FaStar } from "react-icons/fa";

function StarRating({ rating }) {
  const stars = [];

  // for (let i = 0; i < 5; i++) {
  //   if (i < rating) {
  //     stars.push(<FaStar key={i} color="#FFD700" />);
  //   } else {
  //     stars.push(<FaStar key={i} color="gray" />);
  //   }
  // }
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<FaStar key={i} color="#FFD700" />);
  }

  // print a half-star if the rating has a decimal component of 0.5
   // eslint-disable-next-line
  if (rating % 1 == 0.5) {
    stars.push("½");
  }

  // print empty stars for the remaining space
  for (let i = 0; i < Math.floor(5 - rating); i++) {
    stars.push(<FaStar key={i} color="gray" />);
  }

  return <>{stars}</>;
}

export default StarRating;
