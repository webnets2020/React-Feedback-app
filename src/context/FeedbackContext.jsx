import {createContext,useState} from 'react';
import {v4 as uuidv4} from 'uuid';
const feedbackContext = createContext();

export const FeedbackProvider=({children})=>{

    const [feedback, setFeedback]=useState([
        {
            id:1,
            text:"This is from context 1",
            rating:10
        },
        {
            id:2,
            text:"This is from context 2",
            rating:8
        },
        {
            id:3,
            text:"This is from context 3",
            rating:6
        },
    ]);

    const [editFeedback,setEditFeedback] = useState({
        item:{},
        edit:false
    })


    //delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
          setFeedback(feedback.filter((item) => item.id !== id));
        }
      };

      //add feedback

      const addFeedback=(newFeedback)=>{
        newFeedback.id=uuidv4();
        setFeedback([newFeedback,...feedback])
      };

      //update feedback

      const updateFeedback=(id,updateItem)=>{

        setFeedback(feedback.map((item)=> item.id === id ? {...item,...updateItem}:item))

      }

      //edit feedback

      const feedbackEdit=(item)=>{
        setEditFeedback({
            item,
            edit:true
        })

      }
    

    return <feedbackContext.Provider value={{
        feedback,
        editFeedback,
        deleteFeedback,
        addFeedback,
        feedbackEdit,
        updateFeedback,
       
        }}>
        {children}
    </feedbackContext.Provider>
}


export default feedbackContext;