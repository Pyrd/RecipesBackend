export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  auth: process.env.ENABLE_AUTH === 'true',
  roles: process.env.ENABLE_ROLE == 'true' || false,
  user_confirmation: process.env.ENABLE_USER_CONFIRMATION == 'true' || false,
  https: {
    enable: process.env.HTTPS == 'enable',
    certPath: process.env.KEY_PATH || '',
  },
  swagger: process.env.SWAGGER == 'true' || true,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'mysecretpassword',
    database: process.env.DATABASE_DATABASE || 'fdl-backend',
  },
  mailjet: {
    public: process.env.MJ_APIKEY_PUBLIC || '',
    private: process.env.MJ_APIKEY_PRIVATE || '',
  },
});
