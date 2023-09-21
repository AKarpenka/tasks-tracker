import './Project.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
const Project = ({ project }) => {
  // eslint-disable-next-line react/prop-types
  const { name } = project;
  return (
    <div className="project-item">
      <p>{name}</p>
      <FontAwesomeIcon className="faTrash" icon={faTrash} onClick={(e) => console.log(e)} />
    </div>
  );
};

export default Project;
