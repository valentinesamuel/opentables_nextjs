/* eslint-disable react/jsx-key */
import { calculateReviewRatingAverage } from "@/utils/CalculateReviewsRatingAverage";
import { Review } from "@prisma/client";
import Image from "next/image";
import emptyStar from "../../public/empty-star.png";
import error from "../../public/error.png";
import fullStar from "../../public/full-star.png";
import halfStar from "../../public/half-star.png";

export default function Stars({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating?: number;
}) {
  const reviewRating = rating ||  calculateReviewRatingAverage(reviews);
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((reviewRating - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptyStar);
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }

    return stars.map((star) => {
      return <Image src={star} alt="" className="w-4 h-4 mr-1" />;
    });
  };

  return <div className="flex items-center">{renderStars()}</div>;
}
