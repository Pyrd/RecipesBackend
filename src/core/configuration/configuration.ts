export default () => ({
  port: parseInt(process.env.PORT, 10) || 80,
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
    database: process.env.DATABASE_DATABASE || 'postgres',
    ssl: process.env.DATABASE_SSL == 'true' || false,
  },
  firebase_admin: {
    cert: process.env.GOOGLE_SERVICE_ACCOUNT
      ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
      : null,
    storage_bucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  },
  mail: {
    host: process.env.MAIL_HOST,
    pwd: process.env.MAIL_PASSWORD,
    user: process.env.MAIL_USER,
    from: process.env.MAIL_FROM,
  },
  link: {
    webapp: process.env.WEBAPP_BASEURL || 'http://localhost:3000',
  },
});
