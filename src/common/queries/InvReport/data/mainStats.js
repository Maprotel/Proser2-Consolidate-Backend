import * as pool from "../../../../connectors/pool";
import _ from "lodash";

// import userSelectionFilters from "../../InvMenu/userSelection/userSelectionFilters";

import {
  dateAndTimeSqlQuery,
  arrayToSqlQuery,
  objectToJsonSqlQuery,
  arrayToJsonSqlQuery,
  sqlIntervalSqlQuery,
  sqlIntervalGroupSqlQuery
} from "../../../functions/sqlFunctions";


/******************************************************************** */

export async function mainStatsReport ( userSelection ) {

  let array = [];

  let reportsEmergencia = await queryReportsEmergencia( userSelection );
  let reportsAps = await queryReportsAps( userSelection );
  let reportsAmd = await queryReportsAmd( userSelection );
  let callCenterEmergencia = await queryCallCenterEmergencia( userSelection );
  let callCenterAps = await queryCallCenterAps( userSelection );
  let callCenterAmd = await queryCallCenterAmd( userSelection );


  let result = {
    reportsEmergencia,
    reportsAps,
    reportsAmd,
    callCenterEmergencia,
    callCenterAps,
    callCenterAmd
  };

  return result;

}


async function queryReportsEmergencia ( userSelection ) {

  let result = "";


  let query = queryReports( '2019-01-01', '2019-01-31', 'EMERGENCIA-REPORTS' )


  try {
    let resultPre = await pool.reportsEmergencia.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}

async function queryReportsAps ( userSelection ) {

  let result = "";


  let query = queryReports( '2019-01-01', '2019-01-31', 'APS-REPORTS' )


  try {
    let resultPre = await pool.reportsAps.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}

async function queryReportsAmd ( userSelection ) {

  let result = "";


  let query = queryReports( '2019-01-01', '2019-01-31', 'AMD-REPORTS' )


  try {
    let resultPre = await pool.reportsAmd.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}

async function queryCallCenterEmergencia ( userSelection ) {

  let result = "";


  let query = queryCallcenter( '2019-01-01', '2019-01-31', 'EMERGENCIA-CALLCENTER' )

  try {
    let resultPre = await pool.callCenterEmergencia.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}

async function queryCallCenterAps ( userSelection ) {

  let result = "";


  let query = queryCallcenter( '2019-01-01', '2019-01-31', 'APS-CALLCENTER' )


  try {
    let resultPre = await pool.callCenterAps.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}

async function queryCallCenterAmd ( userSelection ) {

  let result = "";

  let query = queryCallcenter( '2019-01-01', '2019-01-31', 'AMD-CALLCENTER' )

  try {
    let resultPre = await pool.callCenterAmd.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}


async function queryReports ( min_date, max_date, host ) {
  let result = '';


  query = `
  
  SELECT
  ${host } AS origin
 ,  (select count(cdr_id) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN ${min_date } and  ${ max_date }) as cdr_count
 , (select min(cdr_id) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN ${min_date } and  ${ max_date }) as cdr_min
 , (select max(cdr_id) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN ${min_date } and  ${ max_date }) as cdr_max
 , (select min(cdr_calldate) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN ${min_date } and  ${ max_date }) as cdr_min_datetime
 , (select max(cdr_calldate) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN ${min_date } and  ${ max_date }) as cdr_max_datetime
 
 
 , (select count(audit_id) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN ${min_date } and ${ max_date }) as audit_count
 , (select min(audit_id) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN ${min_date } and  ${ max_date }) as audit_min
 , (select max(audit_id) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN ${min_date } and  ${ max_date }) as audit_max
 , (select min(audit_datetime_init) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN ${min_date } and ${ max_date }) as audit_min_datetime
 , (select max(audit_datetime_init) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN ${min_date } and  ${ max_date }) as audit_max_datetime
 
 
 , (select count(callentry_id) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN  ${min_date } and  ${ max_date }) as callentry_count
 , (select min(callentry_id) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN  ${min_date } and   ${ max_date }) as callentry_min
 , (select max(callentry_id) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN  ${min_date } and   ${ max_date }) as callentry_max
 , (select min(callentry_datetime_entry_queue) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN ${min_date } and  ${ max_date }) as callentry_min_datetime
 , (select max(callentry_datetime_entry_queue) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN ${min_date } and ${ max_date }) as callentry_max_datetime
 
  `

  return query
}

async function queryCallcenter ( min_date, max_date, host ) {
  let result = '';


  query = `
  
  SELECT
 ${host } AS origin
,  (select count(id) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN ${min_date } and  ${ max_date }) as cdr_count
, (select min(id) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN ${min_date } and  ${ max_date }) as cdr_min
, (select max(id) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN ${min_date } and  ${ max_date }) as cdr_max
, (select min(calldate) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN ${min_date } and  ${ max_date }) as cdr_min_calldate
, (select max(calldate) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN ${min_date } and  ${ max_date }) as cdr_max_calldate


, (select count(id) from call_center.audit WHERE cast(datetime_init as date) BETWEEN ${min_date } and ${ max_date }) as audit_count
, (select min(id) from call_center.audit WHERE cast(datetime_init as date) BETWEEN ${min_date } and  ${ max_date }) as audit_min
, (select max(id) from call_center.audit WHERE cast(datetime_init as date) BETWEEN ${min_date } and  ${ max_date }) as audit_max
, (select min(datetime_init) from call_center.audit WHERE cast(datetime_init as date) BETWEEN ${min_date } and ${ max_date }) as audit_min_calldate
, (select max(datetime_init) from call_center.audit WHERE cast(datetime_init as date) BETWEEN ${min_date } and  ${ max_date }) as audit_max_calldate


, (select count(id) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN  ${min_date } and  ${ max_date }) as callentry_count
, (select min(id) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN  ${min_date } and   ${ max_date }) as callentry_min
, (select max(id) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN  ${min_date } and   ${ max_date }) as callentry_max
, (select min(datetime_entry_queue) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN ${min_date } and  ${ max_date }) as callentry_min_calldate
, (select max(datetime_entry_queue) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN ${min_date } and ${ max_date }) as callentry_max_calldate
  `

  return query
}