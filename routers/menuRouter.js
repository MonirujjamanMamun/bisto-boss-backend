const express = require('express');
const {
  getAllMenu,
  addMenuItem,
  getMenuById,
  deleteMenuById,
  editMenuItemById,
} = require('../controllers/menuController');
const { verifyToken } = require('../middlewares/verifyToken');
const checkAdmin = require('../middlewares/checkAdmin');

const router = express.Router();

router.get('/menu', getAllMenu);
router.get('/menu/:id', getMenuById);
router.post('/menu', verifyToken, checkAdmin, addMenuItem);
router.patch('/editmenu/:id', verifyToken, checkAdmin, editMenuItemById);
router.delete('/menu/:id', verifyToken, checkAdmin, deleteMenuById);

module.exports = router;
