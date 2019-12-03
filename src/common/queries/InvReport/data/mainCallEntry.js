import * as pool from "../../../../connectors/pool";
import _ from "lodash";

// import userSelectionFilters from "../../InvMenu/userSelection/userSelectionFilters";

import {
  dateAndTimeSqlQuery,
  arrayToSqlQuery,
  objectToJsonSqlQuery,
  arrayToJsonSqlQuery,
} from "../../../functions/sqlFunctions";

import {
  objectDateToTextDate
} from '../../../functions/dateFunctions';

/******************************************************************** */

export async function mainCallEntryReport ( userSelection ) {
  let array = [];
  let CallEntryEmergencia = await queryCallEntryEmergencia( userSelection );
  let CallEntryAps = await queryCallEntryAps( userSelection );
  let CallEntryAmd = await queryCallEntryAmd( userSelection );

  let result = _.concat(
    array,
    CallEntryEmergencia,
    CallEntryAps,
    CallEntryAmd
  );

  return result;

}


async function queryCallEntryEmergencia ( userSelection ) {

  let result = "";


  let query = await queryMainCallEntry( userSelection, 'EMERGENCIA' );
  // console.log( 'query', query );


  try {
    let resultPre = await pool.reportsEmergencia.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}


async function queryCallEntryAps ( userSelection ) {

  let result = "";


  let query = await queryMainCallEntry( userSelection, 'A.P.S.' );
  // console.log( 'query', query );

  try {
    let resultPre = await pool.reportsAps.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}


async function queryCallEntryAmd ( userSelection ) {

  let result = "";


  let query = await queryMainCallEntry( userSelection, 'AMD' );
  // console.log( 'query', query );

  try {
    let resultPre = await pool.reportsAmd.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}



async function queryMainCallEntry ( userSelection, host ) {

  let start_date = objectDateToTextDate( userSelection.start_date );
  let end_date = objectDateToTextDate( userSelection.end_date );



  let query = `
  -- ---------------------------------------------------------------
  SELECT 
  
    IF(inv_queue_number = '4001', 'FARMACIA',  '${host }') as call_center
  , 'Entrante' as tipo_llamada
  , IF(callentry_agent_id is not null, 'Atendida', 'Abandonada') as final_status
  
  ,  callentry_id as id
    
  , DATE_FORMAT(callentry_datetime_entry_queue, '%Y-%m-%d' ) as fecha_de_entrada_en_cola
  , DATE_FORMAT(callentry_datetime_entry_queue, '%H:%i:%s' ) as hora_de_entrada_en_cola
  
  , callentry_status as estatus
  , callentry_transfer as extension_llamada_transferida
    
  , callentry_queue_id as cola_id
  , inv_queue_name as cola_nombre
  , inv_queue_number as cola_numero
    
  , callentry_agent_id as agente_id
  , inv_agent_name as agente_nombre
  
  , JSON_UNQUOTE(JSON_EXTRACT(inv_agent_people_json, '$.supervisor.id')) as supervisor_id
  , JSON_UNQUOTE(JSON_EXTRACT(inv_agent_people_json, '$.supervisor.name')) as supervisor_nombre
  
  , callentry_callerid as contacto_telefono
  
  , DATE_FORMAT(callentry_datetime_init, '%Y-%m-%d') as fecha_inicio_llamada
  , DATE_FORMAT(callentry_datetime_init, '%H:%i:%s' ) as hora_inicio_llamada
  
  , DATE_FORMAT(callentry_datetime_end, '%Y-%m-%d') as fecha_fin_llamada
  , DATE_FORMAT(callentry_datetime_end, '%H:%i:%s' ) as hora_fin_llamada
  
  , callentry_duration_sec as duracion_llamada_seg
  
  , callentry_duration_sec_wait as tiempo_espera_seg
  , callentry_uniqueid as numero_llamada_id
  
  , callentry_who_hung as colgada_por
  
  , WEEKDAY(callentry_datetime_entry_queue) + 1 as dia_sem_de_entrada_en_cola
  , DATE_FORMAT(callentry_datetime_entry_queue, '%Y-%u' ) as año_sem_de_entrada_en_cola
  , DATE_FORMAT(callentry_datetime_entry_queue, '%Y-%m' ) as año_mes_de_entrada_en_cola
  , DATE_FORMAT(callentry_datetime_entry_queue, '%Y-%j' ) as año_dia_de_entrada_en_cola
  
  , DATE_FORMAT(callentry_datetime_entry_queue, '%H' ) as hh_de_entrada_en_cola
  , ROUND(TIME_TO_SEC(DATE_FORMAT(callentry_datetime_entry_queue, '%H:%i:%s' ))/60) as mm_de_entrada_en_cola
  , TIME_TO_SEC(DATE_FORMAT(callentry_datetime_entry_queue, '%H:%i:%s' )) as ss_de_entrada_en_cola
  
  
   FROM MainCallEntry
   
  LEFT OUTER JOIN InvAgent as agent
  ON callentry_agent_id = inv_agent_id
  
  LEFT OUTER JOIN InvQueue as queue
  ON callentry_queue_id = inv_queue_id
  
  
  WHERE
    CAST(callentry_datetime_entry_queue AS DATE) BETWEEN '${start_date }' AND '${ end_date }'
  `;

  return query;
}