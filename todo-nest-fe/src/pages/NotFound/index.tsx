import { FC } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export const NotFoundPage: FC = () => (
  <div className="not-found-container">
    <h1>404 - Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/">Go back to Home</Link>
  </div>
);
