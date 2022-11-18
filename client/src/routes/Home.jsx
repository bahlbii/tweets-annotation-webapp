import React from 'react';
import Login from '../components/Login';
import TweetExtractButton from '../components/TweetExtractButton';
import TweetsList from '../components/TweetList';

const Home = () => {
    return (
        <div>
            <TweetExtractButton/>
            <TweetsList />
        </div >
    )
}

export default Home;