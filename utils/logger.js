const winston = require("winston");

const myCustomLevels = {
  levels: {
    error: 0,
    info: 1,

  },
  colors: {
    error: 'red bold redBG',
    info: 'green bold greenBG underline',
  }
};

winston.addColors(myCustomLevels.colors);

const logger = winston.createLogger({
  levels: myCustomLevels.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => `${info.timestamp} ${(info.level)} : ${info.message}`)
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = logger