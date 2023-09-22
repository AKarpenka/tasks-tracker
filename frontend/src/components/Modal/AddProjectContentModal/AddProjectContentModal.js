import Button from '../../Button/Button';
import './AddProjectContentModal.scss';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { hideAddProjectModal } from '../../../redux/actions/modalAction';
import useTasksTrackerService from '../../../services/TasksTrackerService';

const AddProjectContentModal = () => {
  const dispatch = useDispatch();
  const projectNameRef = useRef(null);
  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const { postNewProject } = useTasksTrackerService();

  const onAddProject = async (e) => {
    e.preventDefault();

    const inputValue = projectNameRef.current.value;
    if (inputValue.trim().length === 0) {
      setShowWarningMessage(true);
    } else {
      setShowWarningMessage(false);
      const data = { projectName: projectNameRef.current.value };
      postNewProject(data);
      dispatch(hideAddProjectModal());
    }
  };

  const onCloseModal = () => dispatch(hideAddProjectModal());

  return (
    <div className="add-project-content-modal">
      <p>Let&apos;s create a new project!</p>
      <form>
        <label>Project Name:</label>
        <input type="text" ref={projectNameRef} />
        {showWarningMessage && <p>Write the project name, please</p>}

        <div className="btns">
          <Button value="Create" colorMode="ok" onClickBtn={onAddProject} />
          <Button value="Cancel" colorMode="danger" onClickBtn={onCloseModal} />
        </div>
      </form>
    </div>
  );
};

export default AddProjectContentModal;
