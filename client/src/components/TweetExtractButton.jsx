import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import TweetsLoaderAPI from './TweetsLoaderAPI.js'


const TweetExtractButton = () => {

  let history = useHistory();

  //useState to control forms
  const [searchQuery, setSearchQuery] = useState("");

  const handleExtractTweetsClick = async (e) => {
    //e.preventDefault(); //prevent page from refreshing
    try {
      const response = await TweetsLoaderAPI.post('/allTweets/extractTweets', {
        searchQuery
      });
    } catch (err) {
      console.error(err.message);
    }
    history.push('/allTweets')
  }

  return (
    <div className='mb-2'>
      <div className="input-group mb-3">

        <input value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          id="searchQuery"
          placeholder="Enter a query to search twitter"
          className="form-control"
          type="text" />
        <div className="input-group-append">
          <button
            type="submit"
            onClick={handleExtractTweetsClick}
            className="btn btn-primary"
          >
            Extract Fresh Tweets
          </button>
        </div>
      </div>
    </div>
  )

}

export default TweetExtractButton;