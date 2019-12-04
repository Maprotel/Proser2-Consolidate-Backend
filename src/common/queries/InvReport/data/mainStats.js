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

import {
  objectDateToTextDate
} from '../../../functions/dateFunctions';

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


  let query = await queryReports( userSelection, 'EMERGENCIA-REPORTS' );
  // console.log( 'query', query );


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


  let query = await queryReports( userSelection, 'APS-REPORTS' );


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


  let query = await queryReports( userSelection, 'AMD-REPORTS' );


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


  let query = await queryCallcenter( userSelection, 'EMERGENCIA-CALLCENTER' );

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


  let query = await queryCallcenter( userSelection, 'APS-CALLCENTER' );


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

  let query = await queryCallcenter( userSelection, 'AMD-CALLCENTER' );

  try {
    let resultPre = await pool.callCenterAmd.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}

async function queryReports ( userSelection, host ) {
  let result = '';

  let start_date = objectDateToTextDate( userSelection.start_date );
  let end_date = objectDateToTextDate( userSelection.end_date );

  let query = `
  
  SELECT
  '${host }' AS origin
 ,  (select count(cdr_id) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN '${start_date }' and  '${ end_date }') as cdr_count
 , (select min(cdr_id) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN '${start_date }' and  '${ end_date }') as cdr_min
 , (select max(cdr_id) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN '${start_date }' and  '${ end_date }') as cdr_max
 , (select DATE_FORMAT(min(cdr_calldate), '%Y-%m-%d %H:%i-%s') from MainCdr WHERE cast(cdr_calldate as date) BETWEEN '${start_date }' and  '${ end_date }') as cdr_min_calldate
 , (select DATE_FORMAT(max(cdr_calldate), '%Y-%m-%d %H:%i-%s') from MainCdr WHERE cast(cdr_calldate as date) BETWEEN '${start_date }' and  '${ end_date }') as cdr_max_calldate
 
 
 , (select count(audit_id) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN '${start_date }' and '${ end_date }') as audit_count
 , (select min(audit_id) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN '${start_date }' and  '${ end_date }') as audit_min
 , (select max(audit_id) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN '${start_date }' and  '${ end_date }') as audit_max
 , (select DATE_FORMAT(min(audit_datetime_init), '%Y-%m-%d %H:%i-%s') from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN '${start_date }' and '${ end_date }') as audit_min_calldate
 , (select DATE_FORMAT(max(audit_datetime_init), '%Y-%m-%d %H:%i-%s') from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN '${start_date }' and  '${ end_date }') as audit_max_calldate
 
 
 , (select count(callentry_id) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN  '${start_date }' and  '${ end_date }') as callentry_count
 , (select min(callentry_id) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN  '${start_date }' and   '${ end_date }') as callentry_min
 , (select max(callentry_id) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN  '${start_date }' and   '${ end_date }') as callentry_max
 , (select DATE_FORMAT(min(callentry_datetime_entry_queue), '%Y-%m-%d %H:%i-%s') from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN '${start_date }' and  '${ end_date }') as callentry_min_calldate
 , (select DATE_FORMAT(max(callentry_datetime_entry_queue), '%Y-%m-%d %H:%i-%s') from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN '${start_date }' and '${ end_date }') as callentry_max_calldate
 
  `;

  return query;
}

async function queryCallcenter ( userSelection, host ) {
  let result = '';

  let start_date = objectDateToTextDate( userSelection.start_date );
  let end_date = objectDateToTextDate( userSelection.end_date );

  let query = `
  
  SELECT
 '${host }' AS origin
,  (select count(id) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN '${start_date }' and  '${ end_date }') as cdr_count
, (select min(id) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN '${start_date }' and  '${ end_date }') as cdr_min
, (select max(id) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN '${start_date }' and  '${ end_date }') as cdr_max
, (select DATE_FORMAT(min(calldate), '%Y-%m-%d %H:%i-%s') from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN '${start_date }' and  '${ end_date }') as cdr_min_calldate
, (select DATE_FORMAT(max(calldate), '%Y-%m-%d %H:%i-%s')  from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN '${start_date }' and  '${ end_date }') as cdr_max_calldate


, (select count(id) from call_center.audit WHERE cast(datetime_init as date) BETWEEN '${start_date }' and '${ end_date }') as audit_count
, (select min(id) from call_center.audit WHERE cast(datetime_init as date) BETWEEN '${start_date }' and  '${ end_date }') as audit_min
, (select max(id) from call_center.audit WHERE cast(datetime_init as date) BETWEEN '${start_date }' and  '${ end_date }') as audit_max
, (select  DATE_FORMAT(min(datetime_init), '%Y-%m-%d %H:%i-%s') from call_center.audit WHERE cast(datetime_init as date) BETWEEN '${start_date }' and '${ end_date }') as audit_min_calldate
, (select DATE_FORMAT(max(datetime_init), '%Y-%m-%d %H:%i-%s')  from call_center.audit WHERE cast(datetime_init as date) BETWEEN '${start_date }' and  '${ end_date }') as audit_max_calldate


, (select count(id) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN  '${start_date }' and  '${ end_date }') as callentry_count
, (select min(id) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN  '${start_date }' and   '${ end_date }') as callentry_min
, (select max(id) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN  '${start_date }' and   '${ end_date }') as callentry_max
, (select DATE_FORMAT(min(datetime_entry_queue), '%Y-%m-%d %H:%i-%s')  from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN '${start_date }' and  '${ end_date }') as callentry_min_calldate
, (select DATE_FORMAT(max(datetime_entry_queue), '%Y-%m-%d %H:%i-%s') from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN '${start_date }' and '${ end_date }') as callentry_max_calldate
  `;

  return query;
}