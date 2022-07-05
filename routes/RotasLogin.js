const express = require('express');
const router = express.Router();
const ControllerLogin = require('../controller/ControllerLogin')


router.get('/login', ControllerLogin.fazerLogin);
router.get('/cadastro', ControllerLogin.fazerCadastro)
    


module.exports = router