export enum ROLE {
  USER = 1,
  ADMIN = 2,
}

export interface User {
  id: number;
  email: string;
  role: ROLE;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
