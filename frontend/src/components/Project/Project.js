import './Project.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useTasksTrackerService from '../../services/TasksTrackerService';

// eslint-disable-next-line react/prop-types
const Project = ({ project }) => {
  // eslint-disable-next-line react/prop-types
  const { id, project_name } = project;
  const { deleteProject } = useTasksTrackerService();

  const onDeleteProject = async (e) => {
    e.preventDefault();
    deleteProject(id);
  };

  return (
    <div className="project-item">
      <Link
        className="project-link"
        to={`/tasks/${project_name}`}
        style={{ textDecoration: 'none' }}>
        <p>{project_name}</p>
      </Link>
      <FontAwesomeIcon className="faTrash" icon={faTrash} onClick={onDeleteProject} />
    </div>
  );
};

export default Project;
