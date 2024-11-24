// const winston = require("winston");

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   debug: 4,
// };

// const customFormat = winston.format.combine(
//   winston.format.timestamp(),
//   winston.format.printf(({ timestamp, level, message }) => {
//     return `${timestamp} [${level}]: ${message}`;
//   })
// );

// const logger = winston.createLogger({
//   levels,
//   level: process.env.LOG_LEVEL || "info",
//   format: customFormat,
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.colorize(),
//     }),
//     new winston.transports.File({ filename: "logs/error.log", level: "error" }),
//     new winston.transports.File({ filename: "logs/combined.log" }),
//   ],
// });

// const handleProcessErrors = () => {
//   process.on("unhandledRejection", (reason) => {
//     logger.error(`Unhandled Rejection: ${reason}`);
//   });

//   process.on("uncaughtException", (error) => {
//     logger.error(`Uncaught Exception: ${error}`);
//     process.exit(1);
//   });
// };

// handleProcessErrors();

// module.exports = logger;
