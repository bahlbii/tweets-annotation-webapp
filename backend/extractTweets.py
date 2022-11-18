from concurrent.futures import process
import datetime
import psycopg2
import tweepy
import sys
import os

# .env variables
hostname = os.getenv('PGHOST')  
database = os.getenv('PGDATABASE')
username = os.getenv('PGUSER')
pwd = os.getenv('PGPASSWORD')
port_id = os.getenv('PGPORT')
MY_BEARER_TOKEN = os.getenv('BEARER_TOKEN')

# assign none to cursor and connection
connection = None
cursor = None

# create your client
client = tweepy.Client(bearer_token=MY_BEARER_TOKEN)

# query to search for tweets
query = '{} -is:retweet'.format(sys.argv[1])

#current date
Current_Date=datetime.datetime.today()-datetime.timedelta(hours=3,seconds=10)
Previous_Date = datetime.datetime.today() - datetime.timedelta(days=7)-datetime.timedelta(hours=2, minutes=59, seconds=50)

# your start and end time for fetching tweets
start_time = (Previous_Date.strftime("%Y-%m-%d"))+"T"+(Previous_Date.strftime("%H:%M:%S"))+"Z"
end_time = (Current_Date.strftime("%Y-%m-%d"))+"T"+(Current_Date.strftime("%H:%M:%S"))+"Z"

try:
    connection = psycopg2.connect(
        host=hostname,
        dbname=database,
        user=username,
        password=pwd,
        port=port_id
    )

    # create cursor for connection
    cursor = connection.cursor()

    # get tweets from the Twitter API
    tweets = client.search_recent_tweets(query=query,
                                         start_time=start_time,
                                         end_time=end_time,
                                         tweet_fields=["text", "created_at"],
                                         user_fields=["username"],
                                         max_results=10
                                         )

    # CREATE TWEETS_TABLE
    create_tweets_table = ''' CREATE TABLE IF NOT EXISTS Tweets (
        tweet_id    SERIAL PRIMARY KEY,
        id          bigint NOT NULL,
        created_at  TEXT NOT NULL,
        text        TEXT NOT NULL
    )'''

    # execute create table script
    cursor.execute(create_tweets_table)
    # commit transaction so that execution will finish
    connection.commit()

    # CREATE RATINGS_TABLE
    create_ratings_table = """ CREATE TABLE IF NOT EXISTS Ratings(
                    rating_id BIGSERIAL NOT NULL PRIMARY KEY,
                    tweet_id BIGINT NOT NULL, 
                    rater_name VARCHAR(50) NOT NULL,
                    rating_text TEXT,
                    rating_category1 VARCHAR(50) NOT NULL,
                    rating_category2 VARCHAR(50) NOT NULL,
                    CONSTRAINT fk_tweets 
                        FOREIGN KEY(tweet_id)
                            REFERENCES Tweets(tweet_id)
                ) """
    # execute create table script
    cursor.execute(create_ratings_table)
    # commit transaction so that execution will finish
    connection.commit()

    # store tweets in database
    for x in tweets.data:

        # insert record
        create_tweet_record = ''' INSERT INTO Tweets( id, created_at, text)
                            VALUES( %s, %s, %s)
                    '''
        # the tweet to be inserted
        date_time_str = dict(x)['created_at'].strftime("%B %d, %Y %H:%M:%S")
        
        tweet = (dict(x)['id'], date_time_str, dict(x)['text'])
        # execute create table script
        cursor.execute(create_tweet_record, tweet)
        # commit transaction so that execution will finish
        connection.commit()

except Exception as error:
    print(error)
finally:
    if cursor is not None:
        print('Tweets for query \"{}\" successfully fetched'.format(
            sys.argv[1]))
        cursor.close()
    if connection is not None:
        connection.close()
