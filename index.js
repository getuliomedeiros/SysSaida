 var express = require('express')
var app = express()
var models = require('./models');
var http = require('http');
var bp = require('body-parser');

var alunos = require('./routes/alunos');
var funcionarios = require('./routes/funcionarios');
var professores = require('./routes/professores');
var turmas = require('./routes/turmas');
var usuarios = require('./routes/usuarios');

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bp.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/alunos', alunos);
app.use('/funcionarios', funcionarios);
app.use('/professores', professores);
app.use('/turmas', turmas);
app.use('/usuarios', usuarios);
var port = 3000;
app.set('port', port);
  /**
   * Create HTTP server.
   */
var server = http.createServer(app);

models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
  server.on('error', onError);
  server.on('listening', onListening);
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
