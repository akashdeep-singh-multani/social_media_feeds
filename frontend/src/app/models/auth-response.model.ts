import { User } from '../models/user.model';

export interface AuthResponse {
  status: boolean;
  token: string;
  user: User;
}
