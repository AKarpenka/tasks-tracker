import './Project.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showRemoveProjectModal } from '../../redux/actions/modalAction';
import withModal from '../Modal/ModalHOC/Modal';
import RemoveContentModal from '../Modal/RemoveContentModal/RemoveContentModal';

// eslint-disable-next-line react/prop-types
const Project = ({ project }) => {
  // eslint-disable-next-line react/prop-types
  const { id, project_name } = project;
  const dispatch = useDispatch();
  const isShowRemoveProjectModal = useSelector(
    (state) => state.modalReducer.showRemoveProjectModal
  );

  const RemoveProjectModal = withModal(RemoveContentModal);

  const onDeleteProject = () => dispatch(showRemoveProjectModal(id));

  return (
    <div className="project-item">
      <Link
        className="project-link"
        to={`/tasks/${project_name}`}
        style={{ textDecoration: 'none' }}>
        <p>{project_name}</p>
      </Link>
      <FontAwesomeIcon className="faTrash" icon={faTrash} onClick={onDeleteProject} />

      {isShowRemoveProjectModal && <RemoveProjectModal />}
    </div>
  );
};

export default Project;
