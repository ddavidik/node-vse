import { apiClient } from './apiClient';

type SignInData = {
  email: string;
  password: string;
};

export const signIn = async (data: SignInData) => {
  try {
    return (await apiClient.post('/auth/signin', data)).data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};
