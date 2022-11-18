import React, { useEffect, useContext } from 'react';
import TweetsLoaderAPI from "./TweetsLoaderAPI";
import { TweetsContext } from '../context/TweetsContext';
import { useHistory } from "react-router-dom";

const TweetList = (props) => {
    const { tweets, setTweets } = useContext(TweetsContext);
    let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TweetsLoaderAPI.get("/allTweets");
                setTweets(response.data.data.tweets);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchData();
    });

    //handle a click on tweet row
    const handleTweetSelect =  (tweet_id) => {
        history.push(`/allTweets/${tweet_id}`);
    }

    return (
        <div className='list-group'>
            <table className="table table-bordered table-hover table-striped table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope='col'>#</th>
                        <th scope='col' className="w-75">Tweet</th>
                        <th scope='col' className="w-auto">Tweeted At</th>
                        <th scope='col' className="w-auto">Rate</th>
                    </tr>
                </thead>
                <tbody >

                    {tweets && tweets.map(tweet => {
                        return (
                            <tr onClick={() => handleTweetSelect(tweet.tweet_id)} key={tweet.tweet_id}>
                            <td>{tweet.tweet_id}</td>
                                <td>{tweet.text}</td>
                                <td>{tweet.created_at}</td>
                                <td><button className="btn btn-warning">Rate</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TweetList;