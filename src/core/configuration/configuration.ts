export default () => ({
  port: parseInt(process.env.PORT, 10) || 80,
  auth: process.env.ENABLE_AUTH === 'true',
  roles: process.env.ENABLE_ROLE == 'true' || false,
  user_confirmation: process.env.ENABLE_USER_CONFIRMATION == 'true' || false,
  jwt: {
    jwt_access_token_secret:
      process.env.JWT_ACCESS_TOKEN_SECRET || 'mysecretpassword',
    jwt_access_token_expiration_time:
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || 60 * 15,
    jwt_refresh_token_secret:
      process.env.JWT_REFRESH_TOKEN_SECRET || 'mysecretpassword',
    jwt_refresh_token_expiration_time:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || 60 * 15,
  },
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
  mail: {
    host: process.env.MAIL_HOST,
    pwd: process.env.MAIL_PASSWORD,
    user: process.env.MAIL_USER,
    from: process.env.MAIL_FROM,
  },
  link: {
    webapp: process.env.link_webapp || 'http://localhost:3000',
  },
});
