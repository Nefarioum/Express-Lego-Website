import app from '../app.js'
import debug from 'debug'
//let debug = require('debug')('exp-test:server');
import http from 'http'

const handlePort = (val) => {
  let port = parseInt(val, 10);

  if (isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
}

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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

const onListening = () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


let port = handlePort(process.env.PORT || '8080');
app.set('port', port);

let server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);
