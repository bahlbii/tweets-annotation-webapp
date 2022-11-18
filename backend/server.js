const dotenv = require("dotenv").config(); //environment library to use .env files
const express = require("express")
const app = express();
const cors = require("cors") //nodejs library for cross-origin resource sharing
const db = require("./db/index")
const { spawn } = require('child_process');

//middleware
app.use(cors());
app.use(express.json());

//POST ROUTE to register user
app.post("/api/v1/tweets/register", async (req, res) => {

  const username = req.body.usernameRegister;
  const password = req.body.passwordRegister;

  const regUser = await db.query("INSERT INTO users ( username, password) VALUES ($1, $2)", [
    username, password
  ])

  res.send("success")
})

//Post Route to login
app.post("/api/v1/tweets", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;


  try {
    const loginUser = await db.query("SELECT * FROM Users WHERE username = $1 AND password = $2", [
      username, password]);

    if (loginUser.rowCount === 1) {
      res.status(200).json({
        status: "success",
        data: {
          user: loginUser.rows[0]
        },
      });
    }
    else {
      res.status(404).json({
      });
    }


  } catch (err) {
    console.log(err.message)
  }

});

//GET ROUTE: get all tweets in the database
app.get("/api/v1/tweets/allTweets", async (req, res) => {
  try {
    const allTweets = await db.query("SELECT * FROM Tweets ORDER BY tweet_id DESC");

    res.status(200).json({
      status: "success",
      results: allTweets.rows.length,
      data: {
        tweets: allTweets.rows,
      }
    })
  } catch (err) {
    console.error(err.message);
  }
});

//GET ROUTE: get a tweet with id
app.get("/api/v1/tweets/allTweets/:id", async (req, res) => {
  try {

    //get tweet data
    const { id } = req.params;
    const singleTweet = await db.query("SELECT * FROM Tweets WHERE tweet_id = $1", [
      id
    ]);

    //get reviews of a tweet
    const tweetReviews = await db.query("SELECT * FROM Ratings WHERE tweet_id = $1", [
      id
    ]);
    res.status(200).json({
      status: "success",
      data: {
        tweet: singleTweet.rows[0],
        t_reviews: tweetReviews.rows
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//POST ROUTE: add a rating to a tweet
app.post("/api/v1/tweets/allTweets/:id/rateTweet", async (req, res) => {
  try {
    const singleRating = await db.query(
      "INSERT INTO Ratings (tweet_id, rater_name, rating_text, rating_category1, rating_category2) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [req.params.id, req.body.rater_name, req.body.rater_text, req.body.rating_category1, req.body.rating_category2]
    );

    res.status(201).json({
      status: "success",
      data: {
        rating: singleRating.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//POST ROUTE: extract tweets on button click
app.post('/api/v1/tweets/allTweets/extractTweets', (req, res) => {

  //convert object  to array
  const userQuery = Object.entries(req.body); //array

  //parameter to send to python
  const searchQuery = userQuery[0][1];

  //send parameter to python
  const process = spawn('python', ['./extractTweets.py', searchQuery]);

  process.stdout.on('data', data => {
    console.log(data.toString());
  })

  res.send('successfully extracted tweets!');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});