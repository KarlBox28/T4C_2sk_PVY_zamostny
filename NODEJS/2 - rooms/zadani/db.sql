-- ------------------------------------------------------------
--  TABLE: Room
-- ------------------------------------------------------------
CREATE TABLE Room (
    Id          INT          PRIMARY KEY AUTO_INCREMENT,
    RoomNumber  VARCHAR(10)  NOT NULL UNIQUE,
    Building    VARCHAR(100) NOT NULL,
    Capacity    INT          NOT NULL CHECK (Capacity > 0),
    Type        ENUM(
                    'Lecture Hall',
                    'Lab',
                    'Seminar Room',
                    'Conference Room'
                )            NOT NULL DEFAULT 'Seminar Room'
);

-- ------------------------------------------------------------
--  TABLE: Equipment
-- ------------------------------------------------------------
CREATE TABLE Equipment (
    Id          INT          PRIMARY KEY AUTO_INCREMENT,
    Name        VARCHAR(150) NOT NULL,
    Description TEXT,
    Quantity    INT          NOT NULL DEFAULT 1 CHECK (Quantity >= 0),
    ImageUrl    VARCHAR(500),
    RoomId      INT,

    FOREIGN KEY (RoomId) REFERENCES Room(Id) ON DELETE SET NULL
);
