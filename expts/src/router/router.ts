import express from 'express';
import mainController from '../controllers/main';
import majorController  from '../controllers/majorController'; 

const router = express.Router();

// router.get("/", mainController.main)
// router.get("/about", mainController.about);
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4);
router.get("/lorem/:paragrafos", mainController.lorem);



router.get("/majors/", majorController.index)
router.all("/majors/create", majorController.create)
router.get("/majors/read/:id", majorController.read)
router.all("/majors/update/:id", majorController.update)
router.post("/majors/remove/:id", majorController.remove);

export default router;