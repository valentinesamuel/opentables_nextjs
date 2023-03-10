import Stars from "@/app/components/Stars";
import { calculateReviewRatingAverage } from "@/utils/CalculateReviewsRatingAverage";
import { Review } from "@prisma/client";

const Rating = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>
          <Stars reviews={reviews} />
        </p>
        <p className="text-reg ml-3">
          {calculateReviewRatingAverage(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Reviews</p>
      </div>
    </div>
  );
};

export default Rating;
