-- SQLite

CREATE TABLE IF NOT EXISTS word (
id integer PRIMARY KEY AUTOINCREMENT,
english varchar(500) NOT NULL,
russian varchar(500) NOT NULL,
priority int NOT NULL,
last_updated timestamp NOT NULL

)