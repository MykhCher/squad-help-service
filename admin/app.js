import AdminJS, { DefaultAuthProvider } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import { Resource, Database } from '@adminjs/sql';
// =====
import authenticate from './auth.js';
import options from './config/adminConfig.js';
import { ADMIN_PORT, HOST, AUTH_SECRET } from './constants/index.js';
import { sessionStore } from './config/dbConfig.js';
import { componentLoader } from './components/index.js';

AdminJS.registerAdapter({
  Database,
  Resource,
});


const start = async () => {


  const authProvider = new DefaultAuthProvider({
    componentLoader,
    authenticate,
  });

  const app = express();

  const admin = new AdminJS(await options());
  admin.watch();

  // const adminRouter = AdminJSExpress.buildRouter(admin)

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin, 
    {
      provider: authProvider,
      cookieName: 'adminjs',
      cookiePassword: AUTH_SECRET,
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: AUTH_SECRET,
    }
  )

  app.use(admin.options.rootPath, adminRouter);

  app.listen(ADMIN_PORT, () => {
    console.log(`AdminJS started on http://${HOST}:${ADMIN_PORT}${admin.options.rootPath}`);
  });
}

start();