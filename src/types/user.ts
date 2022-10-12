export interface User {
  id: number;
  username: string;
  email: string;
  provider: string; // local
  confirmed: boolean;
  blocked: boolean;
  createdAt: string; // "2022-09-26T06:12:05.226Z"
  updatedAt: string;
  external_data?: any;
}
