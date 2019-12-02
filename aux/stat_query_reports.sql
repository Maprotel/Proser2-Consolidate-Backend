set @min_date='2019-01-01';
set @max_date='2019-01-31';

SELECT
  (select count(cdr_id) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN @min_date and  @max_date) as cdr_count
, (select min(cdr_id) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN @min_date and  @max_date) as cdr_min
, (select max(cdr_id) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN @min_date and  @max_date) as cdr_max
, (select min(cdr_calldate) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN @min_date and  @max_date) as cdr_min_datetime
, (select max(cdr_calldate) from MainCdr WHERE cast(cdr_calldate as date) BETWEEN @min_date and  @max_date) as cdr_max_datetime


, (select count(audit_id) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN @min_date and @max_date) as audit_count
, (select min(audit_id) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN @min_date and  @max_date) as audit_min
, (select max(audit_id) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN @min_date and  @max_date) as audit_max
, (select min(audit_datetime_init) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN @min_date and @max_date) as audit_min_datetime
, (select max(audit_datetime_init) from MainAudit WHERE cast(audit_datetime_init as date) BETWEEN @min_date and  @max_date) as audit_max_datetime


, (select count(callentry_id) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN  @min_date and  @max_date) as callentry_count
, (select min(callentry_id) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN  @min_date and   @max_date) as callentry_min
, (select max(callentry_id) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN  @min_date and   @max_date) as callentry_max
, (select min(callentry_datetime_entry_queue) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN @min_date and  @max_date) as callentry_min_datetime
, (select max(callentry_datetime_entry_queue) from MainCallEntry WHERE cast(callentry_datetime_entry_queue as date) BETWEEN @min_date and @max_date) as callentry_max_datetime
