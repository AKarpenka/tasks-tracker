/* eslint-disable react/prop-types */
import './Project.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showRemoveProjectModal } from '../../redux/actions/modalAction';

const Project = ({ project }) => {
  const { id, project_name } = project;
  const dispatch = useDispatch();

  const onDeleteProject = () => dispatch(showRemoveProjectModal(id));

  return (
    <div className="project-item">
      <Link
        className="project-link"
        to={`/${id}/${project_name}/tasks/`}
        style={{ textDecoration: 'none' }}>
        <p>{project_name}</p>
      </Link>
      <FontAwesomeIcon className="faTrash" icon={faTrash} onClick={onDeleteProject} />
    </div>
  );
};

export default Project;
