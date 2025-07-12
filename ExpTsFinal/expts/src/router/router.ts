import { Router } from 'express';

// Middlewares
import checkAuth from '../middlewares/authMiddleware';

// Controllers
import mainController from '../controllers/main';
import majorController from '../controllers/majorController';
import userController from '../controllers/userController';
import gameController from '../controllers/gamerController';
//import gameController from '../controllers/gameController'; // Supondo que você criou este controller
// Se a lógica de login/logout estiver em 'user.ts', não precisamos de um authController separado.

const router = Router();
router.get('/', checkAuth, mainController.main);
// --- Rotas Principais / Públicas ---
router.get('/about', mainController.about);
router.get('/lorem/:paragrafos', mainController.lorem);

// --- Rotas de Autenticação ---
// A rota para exibir o formulário de cadastro é pública
router.get('/users/create', userController.create);
// A rota para processar o formulário de cadastro (POST) é pública
router.post('/users/create', userController.create);

// As rotas de login (GET e POST) são públicas
router.all('/users/login', userController.login);

// A rota de logout precisa de autenticação para fazer sentido
router.get('/users/logout', userController.logout);

// A rota para alterar a senha precisa de autenticação
router.all('/users/change-password',checkAuth, userController.changePassword);




// --- Rotas do CRUD de Cursos (Protegidas) ---
router.get("/majors",  majorController.index);
router.all("/majors/create", majorController.create);
router.get("/majors/read/:id", majorController.read);
router.all("/majors/update/:id", majorController.update);
router.post("/majors/remove/:id", majorController.remove);

// --- Rotas do CRUD de Usuários (Protegidas) ---
router.get("/users",checkAuth, userController.index);
router.get("/users/read/:id",checkAuth, userController.read);
router.all("/users/update/:id",checkAuth, userController.update);
router.post("/users/remove/:id", checkAuth,userController.remove);


// Rotas de exemplo dos slides (podem ser removidas ou mantidas para teste)
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get('/cookie', mainController.testeCookie);


router.post('/game/score', checkAuth, gameController.saveScore);
router.get('/ranking', checkAuth, gameController.showRanking);


export default router;