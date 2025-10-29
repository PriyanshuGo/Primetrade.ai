// src/types/user.ts
export interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  bio?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}
