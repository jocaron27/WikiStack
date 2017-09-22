const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = morgan('dev');
const nunjucks = require('nunjucks');
const PORT = 3000;
const routes = require('./routes');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const client = new Client();

client.connect();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(logger);
app.use(express.static('public'));
app.use(routes);

nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html'); 
app.engine('html', nunjucks.render);

app.listen(3000, function() {
    console.log('Server listening on port 3000');
})