const fs = require('fs')
const path = require('path');
const readline = require('readline');
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

function copyLog() {

  const destPath = path.resolve('src', 'logs', 'history', `${new Date().toISOString()}.log`);
  if (!fs.existsSync(path(destPath, '..'))) {
    fs.mkdirSync(path(destPath, '..'));
  }
  const writeStream = fs.createWriteStream(destPath);

  function transformLogEntry(logEntry) {
    const parsedEntry = JSON.parse(logEntry);
    return JSON.stringify({
      message: parsedEntry.message || 'Unknown error',
      time: parsedEntry.time,
      code: parsedEntry.code || 500
    });
  }
  
  const lineReader = readline.createInterface({
    input: fs.createReadStream(pathToLog),
    crlfDelay: Infinity,
  });

  lineReader.on('line', (line) => {
    try {
      const transformedEntry = transformLogEntry(line);
      writeStream.write(transformedEntry + '\n');
    } catch (error) {
      console.error('Error parsing or writing log entry:', error);
    }
  });


  lineReader.on('close', () => {
    console.log('Log transformation complete.');
    writeStream.end(() => {
      fs.truncate(pathToLog, 0, (err) => {
        if (err) console.log('Error clearing the source log file:', err);
        else console.log(`${new Date().toISOString()} ---- Source log file cleared.`);
      });
    });
  });

  writeStream.on('error', (error) => {
    console.error('Error with write stream:', error);
  });

}

module.exports.logger = logger;
module.exports.copyLog = copyLog;