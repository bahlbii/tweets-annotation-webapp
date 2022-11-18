import React from 'react'

const Reviews = ({ reviews }) => {
  return (
    <div className="row row-cols-3 mb-2">
      {reviews.map((review) => {
        return (
          <div
            key={review.rating_id}
            className="card text-white bg-primary mb-3 mr-4"
            style={{ maxWidth: "40%" }}
          >
            <div className="card-header d-flex justify-content-between">
              <span><strong>{review.rater_name}</strong> <i>marked this as </i>
                <strong>"{review.rating_category1}" and "{review.rating_category2}"</strong></span> 

            </div>
            <div className="card-body">
              <p className="card-text">{review.rating_text}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Reviews