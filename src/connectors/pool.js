if ( process.env.NODE_ENV !== `development` ) {
  require( `dotenv` ).config();
}

/***************************** */

const util = require( `util` );
const mysql = require( `mysql` );

// REPORTS
const destinyConsolidate = mysql.createPool( {
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.CONSOLIDATE_DB_HOST,
  user: process.env.CONSOLIDATE_DB_USER,
  password: process.env.CONSOLIDATE_DB_PASSWORD,
  database: process.env.CONSOLIDATE_DATABASE,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "destinyConsolidate"
} );

// REPORTS EMERGENCIA
const reportsEmergencia = mysql.createPool( {
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host:  process.env.REPORTS_HOST_EMERGENCIA,
  user: process.env.READ_ONLY_USER,
  password: process.env.READ_ONLY_PASSWORD,
  database: process.env.REPORTS_DB_EMERGENCIA,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "reportsEmergencia"
} );

// REPORTS APS
const reportsAps = mysql.createPool( {
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host:  process.env.REPORTS_HOST_APS,
  user: process.env.READ_ONLY_USER,
  password: process.env.READ_ONLY_PASSWORD,
  database:  process.env.REPORTS_DB_APS,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "reportsAps"
} );

// REPORTS AMD
const reportsAmd = mysql.createPool( {
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host:  process.env.REPORTS_HOST_AMD,
  user: process.env.READ_ONLY_USER,
  password: process.env.READ_ONLY_PASSWORD,
  database: process.env.REPORTS_DB_AMD,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "reportsAmd"
} );

// CALL CENTER EMERGENCIA
const callCenterEmergencia = mysql.createPool( {
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host:  process.env.CALLCENTER_HOST_EMERGENCIA,
  user: process.env.READ_ONLY_USER,
  password: process.env.READ_ONLY_PASSWORD,
  database: process.env.CALLCENTER_DB_EMERGENCIA,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "callCenterEmergencia"
} );

// CALL CENTER APS
const callCenterAps = mysql.createPool( {
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.CALLCENTER_HOST_APS,
  user: process.env.READ_ONLY_USER,
  password: process.env.READ_ONLY_PASSWORD,
  database: process.env.CALLCENTER_DB_APS,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "callCenterAps"
} );

// CALL CENTER AMD
const callCenterAmd = mysql.createPool( {
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host:  process.env.CALLCENTER_HOST_AMD,
  user: process.env.READ_ONLY_USER,
  password: process.env.READ_ONLY_PASSWORD,
  database: process.env.CALLCENTER_DB_AMD,
  multipleStatements: true,
  max_statement_time: 20,
  connectionName: "callCenterAmd"
} );


// Ping database to check for common exception errors.
reportsEmergencia.getConnection( ( err, connection ) => {
  if ( err ) {
    if ( err.code === `PROTOCOL_CONNECTION_LOST` ) {
      console.error( `Database connection was closed.` );
      return err.code;
    }
    if ( err.code === `ER_CON_COUNT_ERROR` ) {
      console.error( `Database has too many connections.` );
      return err.code;
    }
    if ( err.code === `ECONNREFUSED` ) {
      console.error( `Database connection was refused.` );
      return err.code;
    }
  }

  return;
} );

// Ping database to check for common exception errors.
reportsAps.getConnection( ( err, connection ) => {
  if ( err ) {
    if ( err.code === `PROTOCOL_CONNECTION_LOST` ) {
      console.error( `Database connection was closed.` );
      return err.code;
    }
    if ( err.code === `ER_CON_COUNT_ERROR` ) {
      console.error( `Database has too many connections.` );
      return err.code;
    }
    if ( err.code === `ECONNREFUSED` ) {
      console.error( `Database connection was refused.` );
      return err.code;
    }
  }

  return;
} );

// Ping database to check for common exception errors.
reportsAmd.getConnection( ( err, connection ) => {
  if ( err ) {
    if ( err.code === `PROTOCOL_CONNECTION_LOST` ) {
      console.error( `Database connection was closed.` );
      return err.code;
    }
    if ( err.code === `ER_CON_COUNT_ERROR` ) {
      console.error( `Database has too many connections.` );
      return err.code;
    }
    if ( err.code === `ECONNREFUSED` ) {
      console.error( `Database connection was refused.` );
      return err.code;
    }
  }

  return;
} );

// Ping database to check for common exception errors.
callCenterEmergencia.getConnection( ( err, connection ) => {
  if ( err ) {
    if ( err.code === `PROTOCOL_CONNECTION_LOST` ) {
      console.error( `Database connection was closed.` );
      return err.code;
    }
    if ( err.code === `ER_CON_COUNT_ERROR` ) {
      console.error( `Database has too many connections.` );
      return err.code;
    }
    if ( err.code === `ECONNREFUSED` ) {
      console.error( `Database connection was refused.` );
      return err.code;
    }
  }

  return;
} );

// Ping database to check for common exception errors.
callCenterAps.getConnection( ( err, connection ) => {
  if ( err ) {
    if ( err.code === `PROTOCOL_CONNECTION_LOST` ) {
      console.error( `Database connection was closed.` );
      return err.code;
    }
    if ( err.code === `ER_CON_COUNT_ERROR` ) {
      console.error( `Database has too many connections.` );
      return err.code;
    }
    if ( err.code === `ECONNREFUSED` ) {
      console.error( `Database connection was refused.` );
      return err.code;
    }
  }

  return;
} );

// Ping database to check for common exception errors.
callCenterAmd.getConnection( ( err, connection ) => {
  if ( err ) {
    if ( err.code === `PROTOCOL_CONNECTION_LOST` ) {
      console.error( `Database connection was closed.` );
      return err.code;
    }
    if ( err.code === `ER_CON_COUNT_ERROR` ) {
      console.error( `Database has too many connections.` );
      return err.code;
    }
    if ( err.code === `ECONNREFUSED` ) {
      console.error( `Database connection was refused.` );
      return err.code;
    }
  }

  return;
} );


// Promisify for Node.js async/await.
// origin.query = util.promisify( origin.query );
destinyConsolidate.query = util.promisify( destinyConsolidate.query );

reportsEmergencia.query = util.promisify( reportsEmergencia.query );
reportsAps.query = util.promisify( reportsAps.query );
reportsAmd.query = util.promisify( reportsAmd.query );

callCenterEmergencia.query = util.promisify( callCenterEmergencia.query );
callCenterAps.query = util.promisify( callCenterAps.query );
callCenterAmd.query = util.promisify( callCenterAmd.query );

// destinyInventory.query = util.promisify( destinyInventory.query );
// originInventory.query = util.promisify( originInventory.query );

module.exports = {
  destinyConsolidate,

  reportsEmergencia,
  reportsAps,
  reportsAmd,

  callCenterEmergencia,
  callCenterAps,
  callCenterAmd,
};
