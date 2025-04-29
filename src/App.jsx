import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import Dashboard from './Pages/Dashboard';
import AddTransaction from './Pages/AddTransaction';
import Analytics from './Pages/Analytics';
import Setting from './Pages/Setting';
import Transaction from './Pages/Transaction';
import Header from './Components/layout/Header';
import AppSidebar from './Components/layout/AppSidebar';
import ScrollTop from './Components/comman/ScrollTop';
import Overview from './Pages/Overview';
import {theme} from "./Components/theme/theme.js"

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <ScrollTop />
      <div className="w-full h-screen flex flex-col">
        <header className="fixed w-full z-50 shadow-md">
          <Header />
        </header>
        <div className="flex flex-1 pt-16" style={{backgroundColor : theme.colors.background.lightAlt}}>
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-40">
            <AppSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          </div>
          <div
            className={`flex-1 pt-10 overflow-y-auto transition-all duration-300 ${
              isMobile ? "pl-0" : isCollapsed ? "pl-20" : "pl-64"
            }`}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/AddTransaction" element={<AddTransaction />} />
              <Route path="/Transactions" element={<Transaction />} />
              <Route path="/Setting" element={<Setting />} />
              <Route path="/Analytics" element={<Analytics />} />
              <Route path="/Overview" element={<Overview />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};



export default App;
 