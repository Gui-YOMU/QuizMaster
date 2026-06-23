CREATE USER IF NOT EXISTS 'quizmaster'@'%' IDENTIFIED BY 'password';

ALTER USER 'quizmaster'@'%' IDENTIFIED WITH mysql_native_password BY 'password';

GRANT ALL PRIVILEGES ON quizmaster_db.* TO 'quizmaster'@'%';

FLUSH PRIVILEGES;