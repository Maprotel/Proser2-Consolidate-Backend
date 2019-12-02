set @min_date='2019-01-01';
set @max_date='2019-01-31';

SELECT
 'EMERGENCIA-CALLCENTER' AS origin
,  (select count(id) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN @min_date and  @max_date) as cdr_count
, (select min(id) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN @min_date and  @max_date) as cdr_min
, (select max(id) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN @min_date and  @max_date) as cdr_max
, (select min(calldate) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN @min_date and  @max_date) as cdr_min_calldate
, (select max(calldate) from asteriskcdrdb.cdr WHERE cast(calldate as date) BETWEEN @min_date and  @max_date) as cdr_max_calldate


, (select count(id) from call_center.audit WHERE cast(datetime_init as date) BETWEEN @min_date and @max_date) as audit_count
, (select min(id) from call_center.audit WHERE cast(datetime_init as date) BETWEEN @min_date and  @max_date) as audit_min
, (select max(id) from call_center.audit WHERE cast(datetime_init as date) BETWEEN @min_date and  @max_date) as audit_max
, (select min(datetime_init) from call_center.audit WHERE cast(datetime_init as date) BETWEEN @min_date and @max_date) as audit_min_calldate
, (select max(datetime_init) from call_center.audit WHERE cast(datetime_init as date) BETWEEN @min_date and  @max_date) as audit_max_calldate


, (select count(id) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN  @min_date and  @max_date) as callentry_count
, (select min(id) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN  @min_date and   @max_date) as callentry_min
, (select max(id) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN  @min_date and   @max_date) as callentry_max
, (select min(datetime_entry_queue) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN @min_date and  @max_date) as callentry_min_calldate
, (select max(datetime_entry_queue) from call_center.call_entry WHERE cast(datetime_entry_queue as date) BETWEEN @min_date and @max_date) as callentry_max_calldate
