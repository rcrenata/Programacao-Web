import { User } from '@prisma/client'; 

export type CreateUserDto = Pick<User, 'fullname' | 'email' | 'password' | 'major_id'>;
export type UpdateUserDto = Pick<User, 'fullname' | 'email' | 'major_id'>;
export type LoginDto = Pick<User, 'email' | 'password'>;