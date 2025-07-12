import { Router } from 'express';

import checkAuth from '../middlewares/authMiddleware';

import mainController from '../controllers/main';
import majorController from '../controllers/majorController';
import userController from '../controllers/userController';
import gameController from '../controllers/gamerController';

const router = Router();
router.get('/', checkAuth, mainController.main);
router.get('/about', mainController.about);
router.get('/lorem/:paragrafos', mainController.lorem);

router.get('/users/create', userController.create);
router.post('/users/create', userController.create);

router.all('/users/login', userController.login);

router.get('/users/logout', userController.logout);

router.all('/users/change-password',checkAuth, userController.changePassword);




router.get("/majors",  majorController.index);
router.all("/majors/create", majorController.create);
router.get("/majors/read/:id", majorController.read);
router.all("/majors/update/:id", majorController.update);
router.post("/majors/remove/:id", majorController.remove);

router.get("/users",checkAuth, userController.index);
router.get("/users/read/:id",checkAuth, userController.read);
router.all("/users/update/:id",checkAuth, userController.update);
router.post("/users/remove/:id", checkAuth,userController.remove);


router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get('/cookie', mainController.testeCookie);


router.post('/game/score', checkAuth, gameController.saveScore);
router.get('/ranking', checkAuth, gameController.showRanking);


export default router;