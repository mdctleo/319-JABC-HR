#!/usr/bin/env bash
set -euo pipefail

mysql -h 127.0.0.1 --user root --password=root jabc_db < sql-scripts/init/Create_JABCHR_Schema.sql

mysql -h 127.0.0.1 --user root --password=root jabc_db < sql-scripts/procedures/Create_SP_Document.sql
mysql -h 127.0.0.1 --user root --password=root jabc_db < sql-scripts/procedures/Create_SP_Employee.sql
mysql -h 127.0.0.1 --user root --password=root jabc_db < sql-scripts/procedures/Create_SP_Performance.sql
mysql -h 127.0.0.1 --user root --password=root jabc_db < sql-scripts/procedures/Create_SP_Role.sql
mysql -h 127.0.0.1 --user root --password=root jabc_db < sql-scripts/procedures/Create_SP_Vacation.sql


