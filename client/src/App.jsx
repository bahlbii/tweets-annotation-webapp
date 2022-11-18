import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TweetDetailPage from './routes/TweetDetailPage';
import Home from './routes/Home';
import { TweetsContextProvider } from './context/TweetsContext';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from 'react-bootstrap/Navbar'

const App = () => {
    return (
        <TweetsContextProvider>
            <div className="container">
                <div className="pb-5 mb-5   ">
                    <Navbar bg="dark" variant="dark" className="fixed-top">

                        <Navbar.Brand className="display-1 mx-auto ">

                            Tweets Annotation Tool

                        </Navbar.Brand>
                    </Navbar>
                </div>
                {/* <hr></hr><hr></hr> */}
                <Router>
                    <Switch>

                        <Route exact path="/" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/allTweets" component={Home} />
                        <Route exact path="/allTweets/:id" component={TweetDetailPage} />
                    </Switch>
                </Router>
            </div>
        </TweetsContextProvider>
    )
}

export default App;