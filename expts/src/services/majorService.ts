import { PrismaClient } from '@prisma/client';
import { MajorCreationParams } from '../types/MajorTypes';

const prisma = new PrismaClient();

export const majorService = {
    create: async (data: MajorCreationParams) => {
        return await prisma.major.create({
            data: {
                name: data.name,
                code: data.code,
                description: data.description,
            }
        });
    }
};