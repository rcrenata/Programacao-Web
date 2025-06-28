import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';

type LogFormat = 'simples' | 'completo';

const logger = (format: LogFormat) => {

    const logFilePath = path.join(process.env.LOG_DIR!, 'access.log');

    return async (req: Request, res: Response, next: NextFunction) => {
        const now = new Date().toISOString();
        let logMessage: string;

        if (format === 'simples') {
            logMessage = `${now} | ${req.method} ${req.url}\n`;
        } else {
            const userAgent = req.get('User-Agent') || 'N/A';
            logMessage = `${now} | ${req.method} ${req.httpVersion} ${req.url} | User-Agent: ${userAgent}\n`;
        }

        try {
            await fs.mkdir(process.env.LOG_DIR!, { recursive: true });
            await fs.appendFile(logFilePath, logMessage);
        } catch (error) {
            console.error("Erro ao salvar o log:", error);
        }

        next();
    };
};

export default logger;