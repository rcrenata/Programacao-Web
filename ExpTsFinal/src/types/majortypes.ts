import { Major } from "@prisma/client"; 

export type createMajorDTO = Pick<Major, "code" | "name" | "description">;
export type UpdateMajorDto = Pick<Major, 'name' | 'code' | 'description'>;