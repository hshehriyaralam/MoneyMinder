import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { FormSkeleton } from "../../ui/primitives";
import useAppStore from "../../store/store.js";

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchUser = useAppStore((state) => state.fetchUser);

  useEffect(() => {
    let active = true;
    fetchUser().then((user) => {
      if (!active) return;
      if (!user) {
        navigate('/Login');
      } else {
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [fetchUser, navigate]);

  if (loading) return <FormSkeleton />;
  return <Outlet />; 
};

export default ProtectedLayout;
