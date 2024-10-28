const path = require('path');
// =====
const pino = require('pino');


const pathToLog = path.resolve('src', 'logs', 'app.log');

const fileTransport = pino.transport({
  target: 'pino/file',
  options: {
    destination: pathToLog,
    mkdir: true
  }
});

const logger = pino(
  {
    level: 'error',
    base: null,
    timestamp: false,
    hooks: {
      logMethod (args, method) {
        const result = {err: args[0], msg: ''};
        return method.apply(this, [result]);
      },
    },
    formatters: {
      log (object) {
        return {
          message: object.err.message,
          time: Date.now(),
          code: object.err.status ?? 500,
          stackTrace: object.err.stack,
        }
      },
    },
  },
  fileTransport, 
);

module.exports = logger;