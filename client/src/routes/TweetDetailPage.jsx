import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TweetsContext } from "../context/TweetsContext";
import TweetsLoaderAPI from "../components/TweetsLoaderAPI";
import Reviews from "../components/Ratings";
import AddReview from "../components/RateTweet";

const TweetDetailPage = () => {
  const { id } = useParams();
  const { selectedTweet, setSelectedTweet } = useContext(
    TweetsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TweetsLoaderAPI.get(`/allTweets/${id}`);
        setSelectedTweet(response.data.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {selectedTweet && (
        <>
          <div>
            <div className="card" >
              <div className="card-body">
                <h6 className="card-subtitle mb-2 ">#{selectedTweet.tweet.tweet_id} details</h6>
                <hr></hr>
                <h4 className=" text-primary " >{selectedTweet.tweet.text}</h4>
                <hr></hr>

                <table className="table w-auto">
                  <tbody>
                    <tr>
                      <th scope="row">Tweeted At</th>
                      <td><h6><span className="text-muted">{selectedTweet.tweet.created_at}</span></h6></td>
                    </tr>
                    <tr>
                      <th scope="row">Twitter ID</th>
                      <td><h6><span className="text-secondary">{selectedTweet.tweet.id}</span></h6></td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="text-center">
            <hr></hr>
            <strong>Share your thoughts about the tweet!</strong>
            <hr></hr>

            <div>
              <AddReview />
            </div>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedTweet.t_reviews} />
          </div>

        </>
      )}
    </div>
  )
};

export default TweetDetailPage;