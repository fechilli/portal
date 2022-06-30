var express = require('express');
var router = express.Router();
const mysql = require('../mysql').pool;

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('/login.html');
});
//insere um usuario
router.get('/', (req, res, next) => {


    mysql.getConnection((error, conn) => {
        conn.query(
          'INSERT INTO user (nome,senha) VALUES(?,?)',
          [req.body.nome, req.body.senha],
          (error, resultado, field) =>{
            conn.release();
            if (error){
              res.status(500).send({ 
                error: error,
                response: null
              })
            }
          }
      )
    },

  res.status(201).send({
    mensagem: "Insere um usuario",
    usuarioCriado: user
  })
});

module.exports = router;
