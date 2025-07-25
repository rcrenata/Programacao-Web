import { Request, Response, RequestHandler } from 'express';
import * as gameService from '../services/gameService';

const saveScore: RequestHandler = async (req, res) => {
    const { score } = req.body;
    const userId = req.session.uid;

    if (typeof score !== 'number' || !userId) {
        return res.status(400).json({ error: 'Dados inválidos ou usuário não autenticado.' });
    }

    try {
        await gameService.saveScore(userId, score);
        res.status(200).json({ message: 'Pontuação salva com sucesso!' });
    } catch (error) {
        console.error("Erro ao salvar a pontuação no banco:", error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

const showRanking: RequestHandler = async (req, res) => {
    try {
        const ranking = await gameService.getRanking();
        res.render('game/ranking', { 
            ranking,
            title: "Ranking - Top 10" 
        });
    } catch (error) {
        console.error("Erro ao buscar ranking:", error);
        res.status(500).render('errors/500');
    }
};

const gameController = {
  saveScore,
  showRanking
};

export default gameController;