import React, { useState, useContext,useEffect } from "react";
import RatingSelect from "./RatingSelect";
import Card from "./shared/Card";
import Button from "./shared/Button";
import feedbackContext from "../context/FeedbackContext";

const FeedbackForm = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const {addFeedback , editFeedback, updateFeedback} = useContext(feedbackContext);

  useEffect(()=>{
    if(editFeedback.edit === true){
      setBtnDisabled(false);
      setText(editFeedback.item.text);
      setRating(editFeedback.item.rating)
    }
  },[editFeedback])
  

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Text must be atleast 10 character");
       setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(e.target.value);
  };


  const handleSubmit=(e)=>{

    e.preventDefault();
    if(text.trim().length > 10){
        const newFeedback={
            text:text,
            rating:rating
        }


        if(editFeedback.edit === true){
          updateFeedback(editFeedback.item.id, newFeedback)
        }else{

          addFeedback(newFeedback)

        }

        
        setText('')
    }

  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating)=>setRating(rating)}/>
        <div className="input-group">
          <input
            type="text"
            value={text}
            placeholder="Write a review"
            onChange={handleTextChange}
          />
          <Button type="submit" version="primary" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
