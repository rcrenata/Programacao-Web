import { Prisma, PrismaClient, Major } from "@prisma/client";
import { createMajorDTO, UpdateMajorDto } from "../types/majortypes";
const prisma = new PrismaClient()

export const getMajors = async ():Promise<Major[]> => {
    return await prisma.major.findMany()
}

export const createMajor = async (major: createMajorDTO):Promise<Major> =>{
    return await prisma.major.create({ data : major});
}

export const getMajor = async(id:string): Promise<Major | null> => {
    return await prisma.major.findUnique({ where : { id : id}})
}

export const majorAlreadyExists = async (name: string): Promise<boolean> => {
    const major = await prisma.major.findFirst({ where: { name } });
    return !!major;
};

export const removeMajor = async(id:string): Promise<Major> => {
    return await prisma.major.delete({ where : { id : id } })
}

export const updateMajor = async (id: string, data: UpdateMajorDto): Promise<Major> => { 
    return await prisma.major.update({ where: { id }, data });
}