import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { fetchUserUtils } from '../../utils/auth.js';

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUserUtils(); // ✅ wait for promise
      if (!user) {
        navigate('/'); // redirect to login
      } else {
        setLoading(false); // ✅ only render children when user is valid
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) return <div className="text-center mt-10">Checking user...</div>;

  return <Outlet />; // ✅ safe to render nested routes now
};

export default ProtectedLayout;
