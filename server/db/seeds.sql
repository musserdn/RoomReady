\c roomready_db;

INSERT INTO rooms (room, status)
VALUES (1, 'Clean'),
       (2, 'Scheduled'),
       (3, 'Scheduled'),
       (4, 'Scheduled'),
       (5, 'In Progress'),
       (6, 'Clean'),
       (7, 'Skip Today'),
       (8, 'Clean'),
       (9, 'Clean'),
       (10, 'Clean'),
       (11, 'Scheduled'),
       (12, 'Scheduled');

INSERT INTO users (email, password, type, room_id)
VALUES ('nat@gmail.com', 'password', 'G', 1),
       ('dan@gmail.com', 'password', 'G', 2),
       ('kevin@gmail.com', 'password', 'G', 3),
       ('eric@gmail.com', 'password', 'H', NULL),
       ('austin@gmail.com', 'password', 'H', NULL);