import axios from "axios";

const fetchUserUtils  = async () => {
    try{
        const response = await axios.get(`/api/user/fetch-user`, {
            withCredentials :true
        })

        return response.data.user
    }catch(error){
        return null;
    }
}


export {fetchUserUtils}