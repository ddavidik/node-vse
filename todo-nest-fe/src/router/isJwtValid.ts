import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: unknown;
}

export const isJwtValid = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) {
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return exp > currentTime;
  } catch (error) {
    console.error('Invalid JWT token:', error);
    return false;
  }
};
