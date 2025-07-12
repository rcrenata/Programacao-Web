import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveScore = async (userId: string, score: number) => {
    return prisma.gameSession.create({
        data: {
            score: score,
            user_id: userId  
        }
    });
};

export const getRanking = async () => {
    const highScores = await prisma.gameSession.groupBy({
        by: ['user_id'], 
        _max: {
            score: true, 
        },
        orderBy: {
            _max: {
                score: 'desc', 
            },
        },
        take: 10, 
    });

    const userIds = highScores.map(item => item.user_id);
    const users = await prisma.user.findMany({
        where: {
            id: { in: userIds },
        },
        select: { 
            id: true,
            fullname: true,
        }
    });

    const ranking = highScores.map(scoreItem => {
        const user = users.find(u => u.id === scoreItem.user_id);
        return {
            fullname: user?.fullname ?? 'Usuário Desconhecido',
            score: scoreItem._max.score ?? 0,
        };
    });

    return ranking;
};