import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import { AdminAuthProvider } from './admin/AdminAuthContext.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminApp from './admin/AdminApp.jsx';
import RequireAuth from './admin/RequireAuth.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <AdminApp />
              </RequireAuth>
            }
          />
          {/* Public portfolio (single page) */}
          <Route path="/*" element={<App />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
