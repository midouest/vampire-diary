export interface LoginFormData {
  username: string;
  password: string;
}

export interface TokenResponse {
  key: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
