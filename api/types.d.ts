import { Model } from 'mongoose';

export interface ProductMutation {
  category: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
  sellerName: string;
  sellerPhone: number;
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
