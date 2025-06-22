import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Dashboard from './Pages/Dashboard';
import AddTransaction from './Pages/AddTransaction';
import Analytics from './Pages/Analytics';
import SignUp from './Pages/SignUp';
import Transaction from './Pages/Transaction';
import Header from './Components/layout/Header';
import AppSidebar from './Components/layout/AppSidebar';
import ScrollTop from './Components/comman/ScrollTop';
import Overview from './Pages/Overview';
import Profile from './Pages/Profile.jsx';
import Login from './Pages/Login.jsx';
import ProtectedLayout from './Components/layout/ProtectedLayout.jsx';
import { useLocation } from 'react-router-dom';

const AppContent = ({ isMobile, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/SignUp';

  return (
    <div className="w-full h-screen flex flex-col">
      {!isAuthPage && (
        <header className="fixed w-full z-50 shadow-md">
          <Header />
        </header>
      )}

      <div className="flex flex-1 pt-16 bg-[#f7f7fa]">
        {!isAuthPage && (
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-40">
            <AppSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          </div>
        )}

        <div
          className={`flex-1 pt-10 overflow-y-auto transition-all duration-300 ${
            isAuthPage ? '' : isMobile ? 'pl-0' : isCollapsed ? 'pl-20' : 'pl-64'
          }`}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            
            <Route element={<ProtectedLayout />}>
              <Route path="/Dashbaord" element={<Dashboard />} />
              <Route path="/AddTransaction" element={<AddTransaction />} />
              <Route path="/Transactions" element={<Transaction />} />
              <Route path="/Analytics" element={<Analytics />} />
              <Route path="/Overview" element={<Overview />} />
              <Route path="/Profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <ScrollTop />
      <AppContent
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </Router>
  );
};

export default App;
