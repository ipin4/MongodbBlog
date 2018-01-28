import winston from 'winston';

const _logger = new winston.Logger({
  level: 'verbose',
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      timestamp: true
    })
  ]
});

export const addToLogInfo = (req) => {
  _logger.info({
    message: `Requested path is ${req.url} with ${req.method} method`
  });
}

