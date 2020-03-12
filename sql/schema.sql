CREATE TABLE bills
(
  id SERIAL NOT NULL PRIMARY KEY,
  billname VARCHAR(50) NOT NULL,
  amount INT NOT NULL,
  duedate INT NOT NULL,
  category VARCHAR(50),
  user_id BIGINT
);

CREATE TABLE users
(
  id SERIAL NOT NULL PRIMARY KEY,
  uname VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL,
  upassword VARCHAR(50) NOT NULL,
);

INSERT INTO users
  (uname, username, upassword)
VALUES
  ('RJ Shoemaker', 'rjshoemaker55', 'password');
INSERT INTO users
  (uname, username, upassword)
VALUES
  ('Harry Stintsman', 'harrylarry23', 'noron');
INSERT INTO users
  (uname, username, upassword)
VALUES
  ('Guy Fieri', 'guytheman525', 'fireitup');

INSERT INTO bills
  (billname, amount, duedate, category, user_id)
VALUES
  ('Car Insurance', 195, 5, 'Insurance', 1);
INSERT INTO bills
  (billname, amount, duedate, category, user_id)
VALUES
  ('Food', 85, 10, 'Necessities', 3);
INSERT INTO bills
  (billname, amount, duedate, category, user_id)
VALUES
  ('House Payment', 300, 15, 'House', 2);
INSERT INTO bills
  (billname, amount, duedate, category, user_id)
VALUES
  ('Credit Card', 600, 5, 1);
INSERT INTO bills
  (billname, amount, duedate, category, user_id)
VALUES
  ('Fun', 600, 12, 'Miscellaneous', 2);