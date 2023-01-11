import React,{useContext} from "react";
import {motion,AnimatePresence} from 'framer-motion';
import FeedbackItem from "./FeedbackItem";
import feedbackContext from "../context/FeedbackContext";

const FeedbackList = () => {

  const {feedback} = useContext(feedbackContext)

  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>;
  }

  return (
    <div className="feedback-list">
     <AnimatePresence>
     {feedback.map((item) => (
        <motion.div
        key={item.id}
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        >
        <FeedbackItem
          key={item.id}
          item={item}
        />
        </motion.div>
      ))}
     </AnimatePresence>
    </div>
  );
};



export default FeedbackList;
