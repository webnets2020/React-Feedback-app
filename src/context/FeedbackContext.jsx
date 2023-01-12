import {createContext,useState, useEffect} from 'react';
const feedbackContext = createContext();

export const FeedbackProvider=({children})=>{

    const [isLoading,setIsLoading]=useState(true)

    const [feedback, setFeedback]=useState([]);

    const [editFeedback,setEditFeedback] = useState({
        item:{},
        edit:false
    })


    useEffect(()=>{

      fetchFeedback();

    },[])

    //fetch feedback fromapi

    const fetchFeedback=async()=>{
      const response = await fetch(`/feedback?_sort=id&_order=desc`);
      const data = await response.json();
      setFeedback(data)
      setIsLoading(false);
    }


    //delete feedback
    const deleteFeedback = async(id) => {
        if (window.confirm("Are you sure you want to delete?")) {
          await fetch(`/feedback/${id}`, {method:'DELETE'})
          setFeedback(feedback.filter((item) => item.id !== id));
        }
      };

      //add feedback

      const addFeedback=async(newFeedback)=>{
        const response = await fetch(`/feedback`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(newFeedback),
        });
        
        const data = await response.json();
        setFeedback([data,...feedback])
      };

      //update feedback

      const updateFeedback=async(id,updateItem)=>{
        const response = await fetch(`/feedback/${id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(updateItem)
        })

        const data = await response.json();

        setFeedback(feedback.map((item)=> item.id === id ? {...item,...data``}:item))

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
        isLoading,
        deleteFeedback,
        addFeedback,
        feedbackEdit,
        updateFeedback,
       
        }}>
        {children}
    </feedbackContext.Provider>
}


export default feedbackContext;