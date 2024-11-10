import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import { Resource, Database } from '@adminjs/sql';
// =====
import options from './config/adminConfig.js';
import { ADMIN_PORT, HOST } from './constants/index.js';

AdminJS.registerAdapter({
  Database,
  Resource,
});


const start = async () => {

  const app = express();

  const admin = new AdminJS(await options());
  admin.watch();

  const adminRouter = AdminJSExpress.buildRouter(admin)

  app.use(admin.options.rootPath, adminRouter);

  app.listen(ADMIN_PORT, () => {
    console.log(`AdminJS started on http://${HOST}:${ADMIN_PORT}${admin.options.rootPath}`);
  });
}

start();