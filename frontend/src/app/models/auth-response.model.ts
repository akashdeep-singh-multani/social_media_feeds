import { User } from '../models/user.model';

export interface AuthResponse {
  status: boolean;
  data: {
    token: string;
    user: User;
  };
}
