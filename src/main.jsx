import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './vendor/normalize.css'
import './index.css'
import { HashRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
)
