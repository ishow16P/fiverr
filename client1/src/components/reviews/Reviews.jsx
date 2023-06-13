import React from "react";
import "./Reviews.scss";
import { Review } from "../review/Review";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

export const Reviews = ({ gigId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/gigs/single/`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
    </div>
  );
};
