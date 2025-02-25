import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import Dashboard from './Pages/Dashboard'
import AddTransaction from './Pages/AddTransaction'
import Analytics from './Pages/Analytics'
import Setting from './Pages/Setting'
import Transaction from './Pages/Transaction'
import Header from './Components/layout/Header'
const App = () => {

  return (
    <Router>
    <div className='w-full h-screen bg-slate-400 text-gray-900' >
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/AddTransaction' element={<AddTransaction />} />
        <Route path='/Transaction' element={<Transaction />} />
        <Route path='/Setting' element={<Setting />} />
        <Route path='/Analytics' element={<Analytics />} />
      </Routes>
    </div>
    </Router>
     
  )
}

export default App