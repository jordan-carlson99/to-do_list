DROP TABLE IF EXISTS list;
-- DROP TABLE IF EXISTS home_owner;

CREATE TABLE list (
    id serial unique,
    task text,
    complete boolean
);
