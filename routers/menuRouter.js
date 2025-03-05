const express = require('express');
const { getAllMenu } = require('../controllers/menuController');

const router = express.Router();

router.get('/menu', getAllMenu);

module.exports = router;
