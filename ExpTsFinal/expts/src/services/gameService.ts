import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveScore = async (userId: string, score: number) => {
    return prisma.gameSession.create({
        data: {
            score: score,
            user_id: userId  // Prisma 2+ handles the connect syntax automatically here
        }
    });
};

export const getRanking = async () => {
    // 1. Agrupa as sessões por usuário e pega o score máximo de cada um
    const highScores = await prisma.gameSession.groupBy({
        by: ['user_id'], // Agrupa pelo ID do usuário
        _max: {
            score: true, // Pega o score máximo
        },
        orderBy: {
            _max: {
                score: 'desc', // Ordena pelo maior score
            },
        },
        take: 10, // Limita aos 10 primeiros
    });

    // 2. Busca os nomes dos usuários que estão no ranking
    const userIds = highScores.map(item => item.user_id);
    const users = await prisma.user.findMany({
        where: {
            id: { in: userIds },
        },
        select: { // Pega apenas o ID e o nome para otimizar
            id: true,
            fullname: true,
        }
    });

    // 3. Combina os scores com os nomes dos usuários
    const ranking = highScores.map(scoreItem => {
        const user = users.find(u => u.id === scoreItem.user_id);
        return {
            fullname: user?.fullname ?? 'Usuário Desconhecido',
            score: scoreItem._max.score ?? 0,
        };
    });

    return ranking;
};