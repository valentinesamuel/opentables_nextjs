import { Review } from "@prisma/client";
import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What {reviews.length} people are saying
      </h1>
      <div>
        {reviews.map((review) => {
          return <ReviewCard review={review} key={review.id} />;
        })}
      </div>
    </div>
  );
};

export default Reviews;
