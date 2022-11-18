import React, { useState} from 'react'
import { useParams } from 'react-router-dom';
import TweetsLoaderAPI from './TweetsLoaderAPI';

const AddReview = () => {

    const { id } = useParams();

    //useState to control forms
    const [rater_name, setName] = useState("");
    const [rater_text, setReviewText] = useState("");
    const [rating_category1, setRating1] = useState("-");
    const [rating_category2, setRating2] = useState("-");

    

    const handleSubmitReview = async (e) => {
        e.preventDefault(); //prevent page from refreshing
        try {
            const response = await TweetsLoaderAPI.post(`/allTweets/${id}/rateTweet`, {
                rater_name,
                rating_category1,
                rating_category2,
                rater_text,

            });
            window.location.reload(false); //refreshes the web page after task
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className='mb-2'>
            <form action="">
                <div className="form-row">
                    <div className="form-group col-4">
                        <label htmlFor="rater_name">Name</label>
                        <input value={rater_name}
                            onChange={e => setName(e.target.value)}
                            id="rater_name"
                            placeholder="Enter your name"
                            className="form-control"
                            type="text" />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating_category1">Content</label>
                        <select
                            value={rating_category1}
                            onChange={e => setRating1(e.target.value)}
                            className="custom-select"
                            id="rating_category1">
                            <option disabled> - </option>
                            <option value="Racist">Racism</option>
                            <option value="Homophobic">Homophobia</option>
                            <option value="Violent">Violence</option>
                            <option value="Bully">Bullying</option>
                            <option value="Abusive">Abusive Content</option>
                            <option value="Contains Abbreviation">Contains Abbreviation</option>
                            <option value="Derogatory">Derogatory</option>
                            <option value="Fake News">Fake News</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating_category2">Mood</label>
                        <select
                            value={rating_category2}
                            onChange={e => setRating2(e.target.value)}
                            className="custom-select"
                            id="rating_category2">
                            <option disabled> - </option>
                            <option value="Positive">Positive</option>
                            <option value="Negative">Negative</option>
                            <option value="Offensive">Offensive</option>
                            <option value="Angry">Angry</option>
                            <option value="Cheerful">Cheerful</option>
                        </select>
                    </div>
                </div>
                <div className="foorm-group">
                    <label htmlFor="Review">Explain</label>
                    <textarea
                        value={rater_text}
                        onChange={e => setReviewText(e.target.value)}
                        className='form-control'
                        id="Review"
                        cols="30"
                        rows="10"></textarea>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmitReview}
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>

            
        </div>
    )
}

export default AddReview;