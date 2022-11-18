--create the main tweets table
CREATE TABLE IF NOT EXISTS Tweets(
    tweet_id    SERIAL PRIMARY KEY,
    id          bigint NOT NULL,
    created_at  DATE NOT NULL,
    text        TEXT NOT NULL
)

--create the tweet ratings table
CREATE TABLE IF NOT EXISTS Ratings(
    rating_id BIGSERIAL NOT NULL PRIMARY KEY,
    tweet_id BIGINT NOT NULL, 
    rater_name VARCHAR(50) NOT NULL,
    rating_text TEXT,
    rating_category INT NOT NULL,
    CONSTRAINT fk_tweets 
        FOREIGN KEY(tweet_id)
            REFERENCES Tweets(tweet_id)
)

--create users table
CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
)
