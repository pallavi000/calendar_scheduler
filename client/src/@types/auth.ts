export interface TLoginInputs {
  email: string;
  password: string;
}

export interface TRegisterInputs extends TLoginInputs {
  name: string;
}
