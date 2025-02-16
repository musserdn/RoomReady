\c roomready_db;

INSERT INTO rooms (room, status, "createdAt", "updatedAt")
VALUES (1, 'Clean', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 'Scheduled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (3, 'Scheduled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (4, 'Scheduled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (5, 'In Progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (6, 'Clean', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (7, 'Skip Today', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (8, 'Clean', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (9, 'Clean', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (10, 'Clean', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (11, 'Scheduled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (12, 'Scheduled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO users (email, password, type, room_id, "createdAt", "updatedAt")
VALUES ('nat@gmail.com', 'password', 'G', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('dan@gmail.com', 'password', 'G', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('kevin@gmail.com', 'password', 'G', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('eric@gmail.com', 'password', 'H', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('austin@gmail.com', 'password', 'H', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
