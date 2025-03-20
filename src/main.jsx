import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TransactionContext } from './Context/TransactionContext'

createRoot(document.getElementById('root')).render(
<TransactionContext >
  <App />
</TransactionContext>

)
