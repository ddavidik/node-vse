import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Todos } from './pages/Todos';
import { ProtectedRoute } from './router/ProtectedRoute.tsx';
import { SignInPage } from './pages/SignIn';
import { TodoDetail } from './pages/TodoDetail/index.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route path="/todos" element={<ProtectedRoute />}>
            <Route index element={<Todos />} />
            <Route path=":id" element={<TodoDetail />} />
          </Route>
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
