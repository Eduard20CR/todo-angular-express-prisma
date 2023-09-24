export interface UserSignUpDTO {
  email: string;
  password: string;
  confirmationPassword: string;
}

export interface UserSignInDTO {
  email: string;
  password: string;
}

export interface emailAlreadyRegisteredValidator {
  exists: boolean;
}
