export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface UpsertUserPayload {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}
