import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store/store.js";


  export const useLoggedInUser = () => {
    const navigate = useNavigate();
    const loggedInUser = useAppStore((state) => state.user);
    const fetchUser = useAppStore((state) => state.fetchUser);
    const navigateToAddTransaction = useCallback((path) => {
      if (loggedInUser) {
        navigate(path);
      } else {
        navigate("/Login");
      }
    }, [loggedInUser, navigate]);


    return { loggedInUser,fetchUser, navigateToAddTransaction};
}