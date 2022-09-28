import { User } from "./user";

export interface Auth {
  jwt: string;
  user: User;
}
