export type authProps = {
    setLogin: (value: boolean) => void;
}

// Request payload for login
export interface LoginRequest {
  identifier: string; // email or phone
  password: string;
}

// User object returned by backend
export interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string; // ISO date string
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Data object in response
export interface LoginData {
  data: User;
  accessToken: string;
  refreshToken: string;
}

// Full login response
export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}
