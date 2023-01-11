import React,{useContext} from "react";
import { FaTimes,FaEdit } from "react-icons/fa";
import Card from "./shared/Card";
import feedbackContext from "../context/FeedbackContext";

const FeedbackItem = ({ item }) => {

  const {deleteFeedback, feedbackEdit} = useContext(feedbackContext)

  return (
    <Card key={item.key}>
      <div className="num-display">{item.rating}</div>
      <button onClick={() => deleteFeedback(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <button onClick={()=>feedbackEdit(item)} className="edit">
        <FaEdit color="purple"/>
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
};



export default FeedbackItem;
