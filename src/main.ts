import { Logger } from "@core/infrastructure/logger";

async function bootstrap(): Promise<void> {
  const logger = new Logger();
  try {
    logger.log("Starting compilation in watch mode...");
  } catch (error) {
    logger.error("Application fail", error);
  }
}

void bootstrap();
