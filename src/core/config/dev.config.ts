export default () => {
  const config = {
    appEnv: process.env.NODE_ENV,
    appPort: parseInt(process.env.PORT, 10) || 8000,
    authEnabled: process.env.API_AUTH_ENABLED,
    logLevel: process.env.LOGLEVEL,
    adAppID: process.env.CLIENTID,
    loginMsHost: process.env.LOGINMSHOST,
    tenantId: process.env.TENANTID,
    policyName: process.env.POLICYNAME,
    adLogLevel: process.env.ADLOGLEVEL,
    storageSasKey: process.env.AZURE_STORAGE_SAS_KEY,
    storageAccount: process.env.AZURE_STORAGE_ACCOUNT,
    storageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    emailId: process.env.EMAIL_ID,
    emailPass: process.env.EMAIL_PASS,
    emailHost: process.env.EMAIL_HOST,
    emailPort: process.env.EMAIL_PORT,
    emailSecure: process.env.EMAIL_SECURE,
    emailRepository: process.env.EMAIL_REPOSITORY,
    mailActive: process.env.EMAIL_ACTIVE,
  };
  return config;
};
