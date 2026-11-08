import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { fetchUserUtils } from '../../utils/auth.js';
import { FormSkeleton } from "../../ui/primitives";

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

  if (loading) return <FormSkeleton />;
  return <Outlet />; 
};

export default ProtectedLayout;
