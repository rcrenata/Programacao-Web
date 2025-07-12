import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs'; 
import { CreateUserDto, UpdateUserDto } from '../types/usertypes';

const prisma = new PrismaClient();

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({ include: { major: true } });
};

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt); 

  return await prisma.user.create({
    data: {
      fullname: userData.fullname,
      email: userData.email,
      password: hashedPassword, 
      major: { connect: { id: userData.major_id } }, 
    },
  });
};

export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id }, include: { major: true } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
};

export const updateUser = async (id: string, updatedData: UpdateUserDto): Promise<User> => {
    return await prisma.user.update({
        where: { id },
        data: {
            fullname: updatedData.fullname,
            email: updatedData.email,
            major: { connect: { id: updatedData.major_id } },
        },
    });
};

export const updatePassword = async (userId: string, newPass: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);

    return prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
};

export const removeUser = async (id: string): Promise<User> => {
    return prisma.user.delete({ where: { id } });
};