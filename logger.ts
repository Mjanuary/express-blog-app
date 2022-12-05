import { createLogger, format, transports } from "winston";

export const Logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  level: "info",
  transports: [new transports.Console()],
  exitOnError: false,
});
