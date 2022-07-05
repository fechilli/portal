const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

//importando as rotas
const rotasLogin = require('./routes/RotasLogin')



var path = require('path')
const app = express()
const port = 3000

// usando ejs
app.set('view engine', 'ejs')

// usando a session 
app.use(session({secret: 'dsadsfsdfsdfsdfasdasd'}))
// recuperando os dados do formulario
app.use(bodyParser.urlencoded({ extended:true}))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))

var login = 'felipe'
var senha = '123456'

//usando as rotas
app.use('/', rotasLogin)


app.post('/', (req, res) => {
    //validar  login e senha
    if (req.body.senha == senha && req.body.nome == login){
      //logado com sucesso
      req.session.login = login
      res.render('logado.html')

    }else{
      //direciona para a tela 
    res.render('login.html')

    }
        
  })

app.get('/', (req, res) => {
    if (req.session.login){
      res.render('logado.html')
    }else{
      res.render('login.html')
    }
   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})