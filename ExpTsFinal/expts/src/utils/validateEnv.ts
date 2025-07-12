import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production', 'test'],
            default: 'development'
        }),
        PORT: port({ default: 3333 }),
        DATABASE_URL: str(), 
        SESSION_SECRET: str(),
        LOGS_PATH: str({ default: './logs' }), 
    });
};

export default validateEnv;