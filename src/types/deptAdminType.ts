export interface FormData {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  loginsso: boolean;
  password: string;
  repeatPassword: string;
  instructor: boolean;
  _id: string;
}

export interface Errors {
  firstname?: string;
  middlename?: string;
  lastname?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
}

export interface Data {
  id: number;
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  lastLoggedInDate: string;
}

export interface TableProps {
  data: Data[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface AddFormData {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  loginsso: boolean;
  password: string;
  repeatPassword: string;
  instructor: boolean;
}
