"use strict";

import * as mainCallEntry from "../queries/InvReport/data/mainCallEntry";
import * as mainStats from "../queries/InvReport/data/mainStats";
import * as auditCallEntry from "../queries/InvReport/audit/auditCallEntry";



module.exports = function ( InvReport ) {

  //**********************REMOTE METHOD CALLENTRY REPORT**********************/

  InvReport.mainCallEntryReport = async function ( userSelection ) {
    return mainCallEntry.mainCallEntryReport( userSelection );
  };

  InvReport.remoteMethod( "mainCallEntryReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: [ "Returns values of callentry report" ]
  } );

  //**********************REMOTE METHOD CALLENTRY-AUDIT REPORT**********************/

  InvReport.auditCallEntryReport = async function ( userSelection ) {
    return auditCallEntry.auditCallEntryReport( userSelection );
  };

  InvReport.remoteMethod( "auditCallEntryReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: [ "Returns values of callentry report" ]
  } );



  InvReport.mainStatsReport = async function ( userSelection ) {
    return mainStats.mainStatsReport( userSelection );
  };

  InvReport.remoteMethod( "mainStatsReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: [ "Returns main Stats Report" ]
  } );


};
