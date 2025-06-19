import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TransactionContext } from './Context/TransactionContext'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AlertProvider } from "./Context/AlertContext.jsx";


createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider  clientId='650171672012-41rj4jpgd5jkej4vaikb6hjs34q021v0.apps.googleusercontent.com' >
    
<AlertProvider>
<TransactionContext >
  <App />
</TransactionContext>
  </AlertProvider>
   </GoogleOAuthProvider>

)
