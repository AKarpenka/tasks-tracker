import './RemoveContentModal.scss';
import Button from '../../Button/Button';
import useTasksTrackerService from '../../../services/TasksTrackerService';
import { useDispatch, useSelector } from 'react-redux';
import { hideRemoveProjectModal } from '../../../redux/actions/modalAction';

const RemoveContentModal = () => {
  const dispatch = useDispatch();
  const { deleteProject } = useTasksTrackerService();
  const deleteProjectId = useSelector((state) => state.modalReducer.projectId);

  const onRemoveProject = async (e) => {
    e.preventDefault();

    deleteProject(deleteProjectId);
    dispatch(hideRemoveProjectModal());
  };

  const onCloseModal = () => dispatch(hideRemoveProjectModal());

  return (
    <div className="remove-project-content-modal">
      <p>
        Are you sure you want to delete the entire project? All tasks in this project will be
        deleted.
      </p>

      <div className="btns">
        <Button value="Yes, delete it" colorMode="danger" onClickBtn={onRemoveProject} />
        <Button value="Cancel" colorMode="ok" onClickBtn={onCloseModal} />
      </div>
    </div>
  );
};

export default RemoveContentModal;
