import React, { useState, createContext } from "react";

export const TweetsContext = createContext();

export const TweetsContextProvider = (props) => {

    const [tweets, setTweets] = useState(null);
    const [selectedTweet, setSelectedTweet] = useState(null);

    return (
        <TweetsContext.Provider
            value={{
                tweets,
                setTweets,
                selectedTweet,
                setSelectedTweet,
            }}
        >
            {props.children}
        </TweetsContext.Provider>
    )
}