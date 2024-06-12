import { useMutation } from '@tanstack/react-query';
import { signIn } from '../api/signIn';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['sign-in'],
    mutationFn: signIn,
    onSuccess: (data) => {
      const { access_token } = data;

      if (access_token) {
        Cookies.set('jwt', access_token, { expires: 7 });
        navigate('/todos');
      }
    },
    onError: (error) => {
      console.error('Sign-in error:', error);
    },
  });
};
