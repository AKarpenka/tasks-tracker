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

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));