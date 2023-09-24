CREATE DATABASE tasks_tracker;

CREATE TABLE projects(
    id VARCHAR(255) PRIMARY KEY,
    project_name VARCHAR(255)
);

CREATE TABLE tasks(
	project_id VARCHAR(255),
    project_name VARCHAR(255),
    tasks_number VARCHAR(255) PRIMARY KEY,
    tasks_title VARCHAR(255),
    creation_date VARCHAR(300),
    deadline VARCHAR(300),
    "priority" VARCHAR(30),
    "status" VARCHAR(30)
);

CREATE TABLE projects(
    id VARCHAR(255) PRIMARY KEY,
    project_name VARCHAR(255)
);

CREATE TABLE tasks(
	project_id VARCHAR(255),
    project_name VARCHAR(255),
    task_number VARCHAR(255) PRIMARY KEY,
    task_title VARCHAR(255),
    creation_date VARCHAR(300),
    deadline VARCHAR(300),
    "priority" VARCHAR(30),
    "status" VARCHAR(30)
);

SELECT * FROM projects;

INSERT INTO tasks(project_id, project_name, task_number, task_title, creation_date, deadline, priority, status) 
VALUES('d2619a5f-78fc-4a96-9d2a-85a33879157b', 'qwerty', 'pr-124', 'fix 2 - qweerrttyy', '26-May-2023', '12-May-2023', 'HIGH', 'ToDo');
