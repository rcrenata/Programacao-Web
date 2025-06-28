import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
    LOG_DIR: str(),
  });
};

export default validateEnv;