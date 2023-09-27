const PORT = process.env.PORT ?? 8000;
const cors = require('cors');
const express = require('express');
const app = express();
const pool = require('./db');
const {v4: uuidv4} = require('uuid');

app.use(cors());
app.use(express.json());

//get all projects
app.get('/', async (req, res) => {
    try {
        const projects = await pool.query('SELECT * FROM projects');
        res.json(projects.rows);
    } catch (err) {
        console.error(err);
    }
});

//create new project
app.post('/', async (req,res) => {
    const { projectName } = req.body;
    const id = uuidv4();
    
    try {
        const newProject = await pool.query('INSERT INTO projects(id, project_name) VALUES($1, $2) RETURNING *;', 
                    [id, projectName]);
        res.json(newProject.rows[0]);
    } catch (error) {
        console.error(error);
    }
});

//delete the project
app.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deleteProject = await pool.query('DELETE FROM projects WHERE id = $1;', [id]);
        res.json(deleteProject);
    } catch (error) {
        console.error(error);
    }
});

//get tasks
app.get('/:projectId/:projectName/tasks/', async (req, res) => {
    const {projectId} = req.params;

    try {
        const projects = await pool.query('SELECT * FROM tasks WHERE project_id = $1;', [projectId]);
        res.json(projects.rows);
    } catch (err) {
        console.error(err);
    }
});

//update task status
app.put('/tasks/:taskNumber', async (req, res) => {
    const {taskNumber} = req.params;
    const {newStatus} = req.body;
    try {
        const editTaskStatus = await pool.query('UPDATE tasks SET status = $1 WHERE task_number = $2  RETURNING *;', [newStatus, taskNumber]);
        res.json(editTaskStatus);
    } catch (error) {
        console.error(error);
    }
});

//add new task
app.post('/newTask', async (req,res) => {
    const {
        project_name,
        project_id,
        task_number,
        task_title,
        creation_date,
        deadline,
        time_inprogress,
        priority,
        status,
        subtasks,
        description,
        files
      } = req.body;
    
      
    try {
        pool.query('INSERT INTO tasks(project_name, project_id, task_number, task_title, priority, status, creation_date, deadline, time_inprogress, subtasks, description, files) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);', 
                    [
                        project_name,
                        project_id,
                        task_number,
                        task_title,
                        priority,
                        status,
                        creation_date,
                        deadline,
                        time_inprogress,
                        subtasks,
                        description,
                        files
                    ]);
        res.json(res.statusCode);
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));