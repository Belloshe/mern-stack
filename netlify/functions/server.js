const serverless = require('serverless-http');
const app = require('../../src/App');

exports.handler = serverless(app);
