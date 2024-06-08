import { FC, useState } from 'react';
import { useSignIn } from '../../hooks/useSignIn';
import './styles.css';

export const SignInPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: signIn, error } = useSignIn();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    signIn({ email, password });
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
      {error && <div>Error signing up: {error.message}</div>}
    </div>
  );
};
