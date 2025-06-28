import { Request, Response } from 'express';
import { majorService } from '../services/majorService';
import Joi from 'joi';
import { MajorCreationParams } from '../types/MajorTypes';

const createMajorSchema = Joi.object<MajorCreationParams>({
    name: Joi.string().min(3).required(),
    code: Joi.string().length(4).required(),
    description: Joi.string().allow('').optional()
});

export const majorController = {
    renderCreateForm: (req: Request, res: Response) => {
        const successMessage = req.query.status === 'success' ? "Curso criado com sucesso!" : null;
        const errorMessage = req.query.status === 'error' ? "Erro ao criar o curso. O código já pode existir." : null;
        
        res.render('major/create', { success: successMessage, error: errorMessage });
    },

    create: async (req: Request, res: Response) => {
        const { error, value } = createMajorSchema.validate(req.body);

        if (error) {
            return res.render('major/create', { error: error.details[0].message });
        }

        try {
            await majorService.create(value);
            res.redirect('/majors/create?status=success');
        } catch (err) {
            res.redirect('/majors/create?status=error');
        }
    }
};