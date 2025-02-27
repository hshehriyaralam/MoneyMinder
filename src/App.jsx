import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import Dashboard from './Pages/Dashboard'
import AddTransaction from './Pages/AddTransaction'
import Analytics from './Pages/Analytics'
import Setting from './Pages/Setting'
import Transaction from './Pages/Transaction'
import Header from './Components/layout/Header'
import AppSidebar from './Components/layout/AppSidebar'

const App = () => {
  return (
    <Router>
      <div className="w-full h-screen flex flex-col">
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <Header />
        </header>

        <div className="flex flex-1 pt-16">
          
          {/* Main Content Area */}
          <div className="flex-2 p-10 mt-10 overflow-auto bg-gray-100">
            <div className="flex flex-col">
              {/* Sidebar (Fixed Width) */}
              <div className="w-64 ">
                <AppSidebar />
              </div>

              {/* Content Area */}
              <div className="flex-1">
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
        </div>
      </div>
    </Router>
  );
};

export default App;