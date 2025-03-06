import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Dashboard from './Pages/Dashboard';
import AddTransaction from './Pages/AddTransaction';
import Analytics from './Pages/Analytics';
import Setting from './Pages/Setting';
import Transaction from './Pages/Transaction';
import Header from './Components/layout/Header';
import AppSidebar from './Components/layout/AppSidebar';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <div className="w-full h-screen flex flex-col ">
              <header className="fixed w-full  z-50 shadow-md  ">
          <Header />
        </header>
        <div className="flex flex-1 pt-16  bg-gradient-to-b from-[#34E89E] to-[#0F3443]">
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)]   z-40">
            <AppSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          </div>
          <div
            className={`flex-1 pt-10 overflow-y-auto h-screen transition-all duration-300 ${
              isCollapsed ? 'pl-20' : 'pl-64'
            }`}
          >   
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/AddTransaction" element={<AddTransaction />} />
              <Route path="/Transaction" element={<Transaction />} />
              <Route path="/Setting" element={<Setting />} />
              <Route path="/Analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
 