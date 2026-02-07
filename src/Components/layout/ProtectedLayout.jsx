import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { fetchUserUtils } from '../../utils/auth.js';
import Loader from "../UIverse/Loader.jsx"

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUserUtils(); 
      if (!user) {
        navigate('/Login'); 
      } else {
        setLoading(false); 
      }
    };

    checkUser();
  }, [navigate]);

  {loading && (
  <div className="w-full h-screen flex items-center justify-center">
    <Loader />
  </div>
)}

  return <Outlet />; 
};

export default ProtectedLayout;
