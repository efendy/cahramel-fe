export type UserFormValues = {
  first_name: string;
  last_name: string;
  email_address: string;
  phone: string;
};

export type ContractFormValues = {
  employee_id: string;
  job_title: {label: string; value: number} | undefined;
  department: {label: string; value: number} | undefined;
  reporting_to_main: {label: string; value: number} | undefined;
  reporting_to_secondary: {label: string; value: number} | undefined;
  date_start: string;
  date_end: string;
  needOnBoard: boolean;
  needOffBoard: boolean;
  email: string; // for user-contract
  access_role: string;
};
