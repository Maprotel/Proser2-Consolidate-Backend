import * as pool from "../../../../connectors/pool";

export async function ping () {

  let result = await check();

  let hosts = {
    Consolidado: result[ 0 ][ 0 ].data == 0 ? 'Ok' : 'Error',
    Emergencia_reporteria: result[ 1 ][ 0 ].data == 0 ? 'Ok' : 'Error',
    Aps_reporteria: result[ 2 ][ 0 ].data == 0 ? 'Ok' : 'Error',
    Amd_reporteria: result[ 3 ][ 0 ].data == 0 ? 'Ok' : 'Error',
    Emergencia_call: result[ 4 ][ 0 ].data == 0 ? 'Ok' : 'Error',
    Aps_call: result[ 5 ][ 0 ].data == 0 ? 'Ok' : 'Error',
    Amd_call: result[ 6 ][ 0 ].data == 0 ? 'Ok' : 'Error',
  }

  return hosts;

}


function check () {

  let query = `
  SELECT COUNT(*) as data FROM information_schema.tables WHERE table_schema = 'dbo' and TABLE_TYPE='BASE TABLE'
`

  let temp = Promise.all( [
    pool.destinyConsolidate.query( query ),
    pool.reportsEmergencia.query( query ),
    pool.reportsAps.query( query ),
    pool.reportsAmd.query( query ),
    pool.callCenterEmergencia.query( query ),
    pool.callCenterAps.query( query ),
    pool.callCenterAmd.query( query ),
  ] )

  return temp.then( x => x )
}


export async function pong () {

  let query = `
    SELECT COUNT(*) as data FROM information_schema.tables WHERE table_schema = 'dbo' and TABLE_TYPE='BASE TABLE'
  `

  try {

    let destinyConsolidate = await pool.destinyConsolidate.query( query );
    let reportsEmergencia = await pool.reportsEmergencia.query( query );
    let reportsAps = await pool.reportsAps.query( query );
    let reportsAmd = await pool.reportsAmd.query( query );
    let callCenterEmergencia = await pool.callCenterEmergencia.query( query );
    let callCenterAps = await pool.callCenterAps.query( query );
    let callCenterAmd = await pool.callCenterAmd.query( query );


    return {
      destinyConsolidate,

      reportsEmergencia,
      reportsAps,
      reportsAmd,

      callCenterEmergencia,
      callCenterAps,
      callCenterAmd,
    }

  } catch ( error ) {
    return error
  }

}