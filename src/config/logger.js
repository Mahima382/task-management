// config/logger.js
const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),   // Include stack trace
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}] ${stack || message}`;
    })
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '../logs/error.log') }),
    new transports.Console() // Optional: also log to console
  ],
  exitOnError: false
});

module.exports = logger;
