import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Todos } from './pages/Todos.tsx';
import { ProtectedRoute } from './router/ProtectedRoute.tsx';
import { SignInPage } from './pages/SignInPage.tsx';
import Cookies from 'js-cookie';
import { isJwtValid } from './router/isJwtValid';

const queryClient = new QueryClient();
const token = Cookies.get('jwt');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route
            path="/todos"
            element={
              <ProtectedRoute isAllowed={!!token && isJwtValid(token)} />
            }
          >
            <Route index element={<Todos />} />
          </Route>
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
