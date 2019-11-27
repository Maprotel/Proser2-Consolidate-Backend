if (process.env.NODE_ENV !== `development`) {
  require(`dotenv`).config();
}

/***************************** */

const util = require(`util`);
const mysql = require(`mysql`);

// REPORTS
const destinyReports = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.REPORTS_DB_HOST,
  user: process.env.REPORTS_DB_USER,
  password: process.env.REPORTS_DB_PASSWORD,
  database: process.env.PROSER_REPORTS_DATABASE,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "destinyReports"
});

// REPORTS EMERGENCIA
const destinyReportsEmergencia = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: '172.20.1.46',
  user: 'readmaprotel',
  password: 'M4pr0t3l',
  database: 'proser_rep_hmo_emergencia',
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "destinyReportsEmergencia"
});

// REPORTS APS
const destinyReportsAps = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: '172.20.1.239',
  user: 'readmaprotel',
  password: 'M4pr0t3l',
  database: 'proser_rep_hmo_aps',
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "destinyReportsAps"
});

// REPORTS AMD
const destinyReportsAmd = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: '172.20.1.229',
  user: 'readmaprotel',
  password: 'M4pr0t3l',
  database: 'proser_rep_hmo_amd',
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "destinyReportsAmd"
});

// CALL CENTER EMERGENCIA
const destinyCallCenterEmergencia = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: '172.20.0.235',
  user: 'readmaprotel',
  password: 'M4pr0t3l',
  database: 'call_center',
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "destinyCallCenterEmergencia"
});

// CALL CENTER APS
const destinyCallCenterAps = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: '172.20.0.239',
  user: 'readmaprotel',
  password: 'M4pr0t3l',
  database: 'call_center',
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "destinyCallCenterAps"
});

// CALL CENTER AMD
const destinyCallCenterAmd = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: '172.20.0.234',
  user: 'readmaprotel',
  password: 'M4pr0t3l',
  database: 'call_center',
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "destinyCallCenterAmd"
});

// ORIGIN
const origin = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.ORIGIN_DB_HOST,
  user: process.env.ORIGIN_DB_USER,
  password: process.env.ORIGIN_DB_PASSWORD,
  database: process.env.ORIGIN_ASTERISK_DB,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "origin"
});

// REPORTS
const destinyInventory = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.INVENTORY_DB_HOST,
  user: process.env.INVENTORY_DB_USER_WRITE,
  password: process.env.INVENTORY_DB_PASSWORD_WRITE,
  database: process.env.PROSER_INVENTORY_DATABASE,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "destinyInventory"
});

// REPORTS
const originInventory = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.INVENTORY_DB_HOST,
  user: process.env.INVENTORY_DB_USER_READ,
  password: process.env.INVENTORY_DB_PASSWORD_READ,
  database: process.env.PROSER_INVENTORY_DATABASE,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "destinyInventory"
});

// Ping database to check for common exception errors.
origin.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Ping database to check for common exception errors.
destinyReports.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Ping database to check for common exception errors.
destinyReportsEmergencia.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Ping database to check for common exception errors.
destinyReportsAps.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Ping database to check for common exception errors.
destinyReportsAmd.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Ping database to check for common exception errors.
destinyCallCenterEmergencia.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Ping database to check for common exception errors.
destinyCallCenterAps.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Ping database to check for common exception errors.
destinyCallCenterAmd.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Ping database to check for common exception errors.
destinyInventory.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Ping database to check for common exception errors.
originInventory.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Promisify for Node.js async/await.
origin.query = util.promisify(origin.query);
destinyReports.query = util.promisify(destinyReports.query);
destinyReportsEmergencia.query = util.promisify(destinyReportsEmergencia.query);
destinyReportsAps.query = util.promisify(destinyReportsAps.query);
destinyReportsAmd.query = util.promisify(destinyReportsAmd.query);
destinyCallCenterEmergencia.query = util.promisify(destinyCallCenterEmergencia.query);
destinyCallCenterAps.query = util.promisify(destinyCallCenterAps.query);
destinyCallCenterAmd.query = util.promisify(destinyCallCenterAmd.query);
destinyInventory.query = util.promisify(destinyInventory.query);
originInventory.query = util.promisify(originInventory.query);

module.exports = {
  origin,
  destinyReports,
  destinyReportsEmergencia,
  destinyReportsAps,
  destinyReportsAmd,
  destinyCallCenterEmergencia,
  destinyCallCenterAps,
  destinyCallCenterAmd,
  destinyInventory,
  originInventory
};
