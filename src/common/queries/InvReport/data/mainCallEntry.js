import * as pool from "../../../../connectors/pool";
import _ from "lodash";
import fs from "fs";

const ObjectsToCsv = require("objects-to-csv");
const moment = require("moment");
const publicPath = "../../.;./../public";

// import userSelectionFilters from "../../InvMenu/userSelection/userSelectionFilters";

import {
  dateAndTimeSqlQuery,
  arrayToSqlQuery,
  objectToJsonSqlQuery,
  arrayToJsonSqlQuery
} from "../../../functions/sqlFunctions";

import { objectDateToTextDate } from "../../../functions/dateFunctions";
import { exit } from "shelljs";

/******************************************************************** */

export async function mainCallEntryReport(userSelection) {
  // Extract dates from user selection
  let start_date = objectDateToTextDate(userSelection.start_date);
  let end_date = objectDateToTextDate(userSelection.end_date);

  try {

    // Define file name and location
    fs.writeFile(`${publicPath}/test.csv`, "", "utf-8", x => {
      console.log("Initialize file");
    });

    // Define start date for each month
    let next_start_date = start_date;
    let next_end_date = moment(start_date)
      .endOf("month")
      .format("YYYY-MM-DD");
    console.log("Importando...", next_start_date, next_end_date);

    // Calculating how many months are to be exported
    let amountOfMonths =
      moment(end_date).diff(moment(start_date), "months", true) + 1;
    let months = Math.trunc(amountOfMonths);
    console.log("months", months);

    // Execute for loop for each month and append data to csv file
    for (let x = 1; x <= months; x++) {
      console.log(
        `**************************  ${x}  ******************************`
      );
      console.log("while next_start_date", next_start_date);
      console.log("while next_end_date", next_end_date);
      console.log("-----");

      await writeDataTofile(
        userSelection,
        "EMERGENCIA",
        next_start_date,
        next_end_date
      );

      await writeDataTofile(
        userSelection,
        "APS",
        next_start_date,
        next_end_date
      );

      await writeDataTofile(
        userSelection,
        "AMD",
        next_start_date,
        next_end_date
      );

      // Calculate next month
      next_start_date = moment(next_start_date)
        .add(1, "M")
        .startOf("month")
        .format("YYYY-MM-DD");
      next_end_date = moment(next_start_date)
        .endOf("month")
        .format("YYYY-MM-DD");
    }
    console.log("********************************************************");
    console.log("El Fin");

    return [];
  } catch (error) {
    console.log("ERROR mainCallEntryReport", error);
    return error;
  }
}

export async function writeDataTofile(
  userSelection,
  call,
  start_date,
  end_date
) {
  let query;
  let data;
  let csv;

  console.log("write", call, start_date, end_date);

  query = await queryMainCallEntry(userSelection, call, start_date, end_date);

  if (call === "EMERGENCIA") {
    data = await pool.reportsEmergencia.query(query);
    console.log("------------------");
    console.log("data", call, data.length);
  }

  if (call === "APS") {
    data = await pool.reportsAps.query(query);
    console.log("------------------");
    console.log("data", call, data.length);
  }

  if (call === "AMD") {
    data = await pool.reportsAmd.query(query);
    console.log("------------------");
    console.log("data", call, data.length);
  }

  csv = new ObjectsToCsv(data);
  await csv.toDisk("./test.csv", { append: true });
  csv = null;
  return [];
}

async function queryMainCallEntry(userSelection, host, start_date, end_date) {
  let query = `
  -- ---------------------------------------------------------------
  SELECT 
  
    IF(inv_queue_number = '4001', 'FARMACIA',  (IF(inv_queue_number = '5007', 'FUNERARIA',  '${host}'))) as call_center
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
    CAST(callentry_datetime_entry_queue AS DATE) BETWEEN '${start_date}' AND '${end_date}'

   -- LIMIT 100
  `;

  return query;
}
