import { User } from 'src/app/core/models/user.model';

export interface UserSignUpDTO {
  email: string;
  password: string;
  confirmationPassword: string;
}

export interface UserSignInDTO {
  email: string;
  password: string;
}

export interface UserSignInResponse {
  mesage: string;
  data: {
    user: User;
  };
}

export interface emailAlreadyRegisteredValidator {
  exists: boolean;
}
