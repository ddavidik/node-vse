import { FC } from 'react';
import { useSocket } from './hooks/useSocket';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Todos } from './pages/Todos';
import { ProtectedRoute } from './router/ProtectedRoute.tsx';
import { SignInPage } from './pages/SignIn';
import { TodoDetail } from './pages/TodoDetail/index.tsx';
import { NotFoundPage } from './pages/NotFound/index.tsx';
import App from './App.tsx';

export const MainWrapper: FC = () => {
  useSocket('http://localhost:3000');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/todos" element={<ProtectedRoute />}>
          <Route index element={<Todos />} />
          <Route path=":id" element={<TodoDetail />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
