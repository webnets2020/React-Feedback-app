import React,{useContext} from 'react'
import feedbackContext from '../context/FeedbackContext';

const FeedbackStats = () => {

  const {feedback} = useContext(feedbackContext)
  
    //calculate avg rating
    let average = feedback.reduce((acc,curr)=>{

        return acc + curr.rating

    },0) / feedback.length

    //setup avg decimal
    average=average.toFixed(1).replace(/[.,]0$/,'')

  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}


export default FeedbackStats