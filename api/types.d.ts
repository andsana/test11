import { Model } from 'mongoose';

export interface ProductMutation {
  category: string;
  user: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
}

export interface UserFields {
  username: string;
  password: string;
  displayName: string;
  phone: number;
  token: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;
