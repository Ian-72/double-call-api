const pino = require('pino')({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'hostname,pid',
    },
  },
});

const expressPino = require('express-pino-logger')({
  logger: pino,
  autoLogging: true,
  serializers: {
    err: (err) => err.message,
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken',
  },
});

module.exports = expressPino;
