import express from 'express';
import mainController from '../controllers/main';
import { majorController } from '../controllers/majorController'; 

const router = express.Router();

router.get('/majors/create', majorController.renderCreateForm);

router.post('/majors/create', majorController.create);

export default router;