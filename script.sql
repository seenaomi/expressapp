-- Add Users
CREATE USER app_ro WITH PASSWORD 'goodgood';
CREATE USER app_rw WITH PASSWORD 'goodgood';

-- Create DB
CREATE DATABASE myapp;

-- login to the new DB
\c myapp

-- Revoke all Privileges
REVOKE ALL ON DATABASE myapp FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM PUBLIC;

-- Set up privileges for app_ro
GRANT CONNECT ON DATABASE myapp to app_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_ro;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO app_ro;
GRANT USAGE ON SCHEMA public to app_ro;


-- Set up privileges for app_rw
GRANT CONNECT ON DATABASE myapp to app_rw;
GRANT SELECT, UPDATE, INSERT, DELETE ON ALL TABLES IN SCHEMA public TO app_rw;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO app_rw;
GRANT USAGE ON SCHEMA public to app_rw;


GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO app_ro;
GRANT USAGE ON SCHEMA public to app_ro;

-- Set up privileges for app_ro (for new tables)
ALTER DEFAULT PRIVILEGES IN SCHEMA public
   GRANT SELECT ON TABLES TO app_ro;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
   GRANT SELECT ON SEQUENCES TO app_ro;

-- Set up privileges for app_rw (for new tables)
ALTER DEFAULT PRIVILEGES IN SCHEMA public
   GRANT SELECT, UPDATE, INSERT, DELETE ON TABLES TO app_rw;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
   GRANT SELECT, UPDATE ON SEQUENCES TO app_rw;

--Create tables
CREATE TABLE message (id serial, msg varchar(1024));

--Insert some test data
INSERT INTO message (msg) VALUES ('First Test Message');
INSERT INTO message (msg) VALUES ('Second Test Message');
