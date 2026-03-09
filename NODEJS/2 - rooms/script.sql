--CREATE DATABASE RoomEquip;

USE RoomEquip;

-- ------------------------------------------------------------
--  TABLE: Room
-- ------------------------------------------------------------
CREATE TABLE Rooms (
    Id          INT          PRIMARY KEY IDENTITY(1,1),
    RoomNumber  VARCHAR(10)  NOT NULL UNIQUE,
    Building    VARCHAR(100) NOT NULL,
    Capacity    INT          NOT NULL CHECK (Capacity >= 0) DEFAULT 1,
    Type        VARCHAR(100) NOT NULL DEFAULT 'Lecture Hall',
);

-- ------------------------------------------------------------
--  TABLE: Equipment
-- ------------------------------------------------------------
CREATE TABLE Equipment (
    Id          INT          PRIMARY KEY IDENTITY(1,1),
    Name        VARCHAR(150) NOT NULL,
    Description TEXT,
    Quantity    INT          NOT NULL DEFAULT 1 CHECK (Quantity >= 0),
    ImageUrl    VARCHAR(500),
    RoomId      INT,

    FOREIGN KEY (RoomId) REFERENCES Rooms(Id) ON DELETE SET NULL
);

