const http = require('http');
// ============================
require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./dbMongo/mongoose');
// =====
const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');
const { copyLog } = require('./logger');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || '',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);

const server = http.createServer(app);
server.listen(PORT, () =>  console.log(`Example app listening on port ${PORT}!`));
controller.createConnection(server);

cron.schedule('0 0 * * *', copyLog);
