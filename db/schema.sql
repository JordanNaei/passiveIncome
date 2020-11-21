CREATE DATABASE passive_income_db;

-- Put the db to use
USE passive_income_db;

-- Created the table "burger"
CREATE TABLE iPhones (
  id int AUTO_INCREMENT NOT NULL,
  model varchar(256) NOT NULL,
  asin_n varchar(256),
  upc_n varchar(256),
  capacity INT NOT NULL,
  PRIMARY KEY(id)
);

