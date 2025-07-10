const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.list);
router.get('/create', userController.formCreate);
router.post('/create', userController.create);
router.get('/edit/:id', userController.formEdit);
router.get('/edit_form', userController.formEditRender);
router.post('/edit/:id', userController.update);
router.get('/delete/:id', userController.delete);

module.exports = router;