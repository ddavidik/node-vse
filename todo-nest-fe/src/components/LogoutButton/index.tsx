import { FC } from 'react';
import Cookies from 'js-cookie';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export const LogoutButton: FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt');
    navigate('/auth/signin');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-logout"
        width="38"
        height="38"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#ffffff"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path d="M9 12h12l-3 -3" />
        <path d="M18 15l3 -3" />
      </svg>
    </button>
  );
};
