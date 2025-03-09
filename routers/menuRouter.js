const express = require('express');
const {
  getAllMenu,
  addMenuItem,
  getMenuById,
  deleteMenuById,
} = require('../controllers/menuController');

const router = express.Router();

router.get('/menu', getAllMenu);
router.get('/menu/:id', getMenuById);
router.post('/menu', addMenuItem);
router.delete('/menu/:id', deleteMenuById);

module.exports = router;
