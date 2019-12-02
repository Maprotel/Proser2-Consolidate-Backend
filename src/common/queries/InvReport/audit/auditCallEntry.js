import * as pool from "../../../../connectors/pool";

import {
  dateAndTimeSqlQuery
} from "../../../functions/sqlFunctions";

/******************************************************************** */

export async function auditCallEntryReport ( userSelection ) {
  let result = {};
  let CallCenterEmergencia = await auditCallEntryCallCenterEmergencia( userSelection );
  let ReportEmergencia = await auditCallEntryReportEmergencia( userSelection );
  let CallCenterAps = await auditCallEntryCallCenterAps( userSelection );
  let ReportAps = await auditCallEntryReportAps( userSelection );
  let CallCenterAmd = await auditCallEntryCallCenterAmd( userSelection );
  let ReportAmd = await auditCallEntryReportAmd( userSelection );

  result = {
    CallCenterEmergencia,
    ReportEmergencia,
    CallCenterAps,
    ReportAps,
    CallCenterAmd,
    ReportAmd
  };

  return result;
}

async function auditCallEntryCallCenterEmergencia ( userSelection ) {
  let result = "";

  let query = `
    -- ---------------------------------------------------------------
    -- FIELDS
    SELECT 
    
    COUNT(*) as registros
    
    
     FROM call_entry
     
    
    -- ---------------------------------------------------------------
    -- CONDITIONS
    WHERE 1
    
    -- TIME AND DATE
    ${dateAndTimeSqlQuery( userSelection, "datetime_entry_queue" ) }
    
    
    -- ---------------------------------------------------------------
    -- END
    `;


  try {
    let resultPre = await pool.callCenterEmergencia.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}


async function auditCallEntryReportEmergencia ( userSelection ) {
  let result = "";

  let query = `
      -- ---------------------------------------------------------------
      -- FIELDS
      SELECT 
      
      COUNT(*) as registros
      
      
       FROM MainCallEntry
       
      
      -- ---------------------------------------------------------------
      -- CONDITIONS
      WHERE 1
      
      -- TIME AND DATE
      ${dateAndTimeSqlQuery( userSelection, "callentry_datetime_entry_queue" ) }
      
      
      -- ---------------------------------------------------------------
      -- END
      `;


  try {
    let resultPre = await pool.reportsEmergencia.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}


async function auditCallEntryCallCenterAps ( userSelection ) {
  let result = "";

  let query = `
      -- ---------------------------------------------------------------
      -- FIELDS
      SELECT 
      
      COUNT(*) as registros
      
      
       FROM call_entry
       
      
      -- ---------------------------------------------------------------
      -- CONDITIONS
      WHERE 1
      
      -- TIME AND DATE
      ${dateAndTimeSqlQuery( userSelection, "datetime_entry_queue" ) }
      
      
      -- ---------------------------------------------------------------
      -- END
      `;


  try {
    let resultPre = await pool.callCenterAps.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}


async function auditCallEntryReportAps ( userSelection ) {
  let result = "";

  let query = `
        -- ---------------------------------------------------------------
        -- FIELDS
        SELECT 
        
        COUNT(*) as registros
        
        
         FROM MainCallEntry
         
        
        -- ---------------------------------------------------------------
        -- CONDITIONS
        WHERE 1
        
        -- TIME AND DATE
        ${dateAndTimeSqlQuery( userSelection, "callentry_datetime_entry_queue" ) }
        
        
        -- ---------------------------------------------------------------
        -- END
        `;


  try {
    let resultPre = await pool.reportsAps.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}


async function auditCallEntryCallCenterAmd ( userSelection ) {
  let result = "";

  let query = `
        -- ---------------------------------------------------------------
        -- FIELDS
        SELECT 
        
        COUNT(*) as registros
        
        
         FROM call_entry
         
        
        -- ---------------------------------------------------------------
        -- CONDITIONS
        WHERE 1
        
        -- TIME AND DATE
        ${dateAndTimeSqlQuery( userSelection, "datetime_entry_queue" ) }
        
        
        -- ---------------------------------------------------------------
        -- END
        `;


  try {
    let resultPre = await pool.callCenterAmd.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}


async function auditCallEntryReportAmd ( userSelection ) {
  let result = "";

  let query = `
          -- ---------------------------------------------------------------
          -- FIELDS
          SELECT 
          
          COUNT(*) as registros
          
          
           FROM MainCallEntry
           
          
          -- ---------------------------------------------------------------
          -- CONDITIONS
          WHERE 1
          
          -- TIME AND DATE
          ${dateAndTimeSqlQuery( userSelection, "callentry_datetime_entry_queue" ) }
          
          
          -- ---------------------------------------------------------------
          -- END
          `;


  try {
    let resultPre = await pool.reportsAmd.query( query );
    result = resultPre;
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}