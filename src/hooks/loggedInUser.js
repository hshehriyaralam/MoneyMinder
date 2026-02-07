import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


  export const useLoggedInUser = () => {
    const navigate = useNavigate();
    const [loggedInUser, setUser] = useState(null);
     const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/fetch-user`,
        {
          withCredentials: true,
        },
      )
      setUser(response.data.user);
    } catch (error) {
      console.log("fetchUser failed", error.message);
    }
    
  }

  const navigateToAddTransaction = (path) => {
  if(loggedInUser) {
    navigate(path)
  } else {  
    navigate("/Login")
  }}


    return { loggedInUser,fetchUser, navigateToAddTransaction};
}