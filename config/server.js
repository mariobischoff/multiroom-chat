/* importar o modulo do express */
var express = require('express');

/* importar consgin */
var consign = require('consign');

/* importar body-parser */
var bodyParser = require('body-parser');

/* importar express-validator */
var expressValidator = require('express-validator');

/* iniciar o objeto express */
var app = express();

/* setar as variaveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* config middleware express.static */
app.use(express.static('./app/public'));

/* config middleware body-parser */
app.use(bodyParser.urlencoded({extended : true}));

/* config middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, models, controllers para obj app */
consign()
  .include('app/routes')
  .then('app/models')
  .then('app/controllers')
  .into(app);

/* exportar o objeto app */
module.exports = app;
