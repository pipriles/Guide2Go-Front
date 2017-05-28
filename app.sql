PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE ZONES(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
NAME VARCHAR(255) NOT NULL,
POLYGON VARCHAR(255) NOT NULL
);
CREATE TABLE GUIDES(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
ZONE_ID INTEGER NOT NULL,
LANG CHAR(20),
FOREIGN KEY (ZONE_ID) REFERENCES ZONES(ID)
);
CREATE TABLE SUB_ZONES(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
ZONE_ID INTEGER NOT NULL,
NAME VARCHAR(255) NOT NULL,
POLYGON VARCHAR(255) NOT NULL,
FOREIGN KEY (ZONE_ID) REFERENCES ZONES(ID)
);
CREATE TABLE SPOTS(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
SUB_ZONE_ID INTEGER NOT NULL,
CATEGORY VARCHAR(255) NOT NULL,
NAME VARCHAR(255) NOT NULL,
DESCRIPTION TEXT,
POINT VARCHAR(255) NOT NULL,
FOREIGN KEY (SUB_ZONE_ID) REFERENCES SUB_ZONES(ID)
);
CREATE TABLE AUDIOS(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
SPOT_ID INTEGER NOT NULL,
LANG CHAR(20),
PATH VARCHAR(255) NOT NULL,
FOREIGN KEY (SPOT_ID) REFERENCES SPOTS(ID)
);
DELETE FROM sqlite_sequence;
COMMIT;