var express = require('express');
var router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt =require('bcrypt');

router.post('/',(req, res, next) => {
    //conexat com o banco de dados e mensagem de erro no caso de falha
    mysql.getConnection((err, conn) => {
        if(err) { return res.status(500).send({error:error})}
        //realizando consulta se email ja existe
        conn.query('SELECT *FROM usuarios WHERE email =?', [res.body.email], (error, results) =>{
            if (error) {return res.status(500).send({error:error})}
            if (results.length > 0) {
                res.status(409).send({mensagem: "Usuario já cadastrado"})
            }else{
                bcrypt.hash(req.body.senha,10, (errBcrypt, hash) =>{
                    if (errBcrypt) {return res.status(500).send({error: errBcrypt})}
                    conn.query(
                        'INSERT INTO usuarios (email,senha) VALUES(?,?)',
                        [req._construct.body.email, hash],
                        (error, results)=>{
                            conn.release();
                            if(err) { return res.status(500).send({error:error})}
                            response = {
                                mensagem :'Usuário criado com sucesso',
                                usuarioCriado: {
                                    id_usuario: results.insertId,
                                    email: req.body.email
                                }
                            }
                            return res.status(201).send(response);
                        }
                    )
                })                   
            }
        })      
    });
})

router.get('/login',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error) { return res.status(500).send({error:error})}
        const query = 'SELECT *FROM usuarios WHERE email=?';
        //conferir se a senha esta correta
        conn.query(query,[req.body.email], (error,results, fields)=>{
            conn.release()
            if(error) {return res.status(500).send({error:error})}
            if (results.length > 1){
                return res.status(401).send({mensagem:'Falha na autenticação'})
            }
            //conferir se a senha esta correta
            bcrypt.compare(req.body.senha, results[0].senha, (err, results) =>{
                if (err){
                    return res.status(401).send({mensagem:'Falha na autenticação/'})
                }
               

            })
        });

    });
})


module.exports = router;