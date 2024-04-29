# Docker Postgres

## Commands

- \l list databases
- \c connect to database
- \d list tables
- \q quit

## Solve Dirty Migration

1. Connect to the database inside psql cli
2. ```select * from schema_migrations```
3. ```update schema_migrations set dirty =false where version=xxxx```
