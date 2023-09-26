import './TasksPage.scss';
import DnDZone from '../../components/DnDZone/DnDZone';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useTasksTrackerService from '../../services/TasksTrackerService';
import { filterTasksByNumber, filterTasksByTitle } from '../../redux/actions/tasksAction';
import { showAddNewTaskModal } from '../../redux/actions/modalAction';
import withModal from '../../components/Modal/ModalHOC/Modal';
import AddNewTaskContentModal from '../../components/Modal/AddNewTaskContentModal/AddNewTaskContentModal';
import Spinner from '../../components/Spinner/Spinner';

const TasksPage = () => {
  const { getTasks } = useTasksTrackerService();
  const { tasksLoadingStatus } = useSelector((state) => state.tasksReducer);
  const isShowAddNewTaskModal = useSelector((state) => state.modalReducer.showAddNewTaskModal);
  const dispatch = useDispatch();
  const { projectId, projectName } = useParams();

  const AddNewTaskModal = withModal(AddNewTaskContentModal);

  const onFilterByNumber = (e) => dispatch(filterTasksByNumber(e.target.value));
  const onFilterByTitle = (e) => dispatch(filterTasksByTitle(e.target.value));

  const onAddTask = () => dispatch(showAddNewTaskModal());

  useEffect(() => {
    getTasks(projectId, projectName);
  }, []);

  if (tasksLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (tasksLoadingStatus === 'error') {
    return <p>Loading Error</p>;
  }

  return (
    <>
      <nav>
        <Link to="/">Projects</Link> / {projectName}
      </nav>

      <div className="filters">
        <div className="add-task-btn" onClick={onAddTask}>
          Add task <FontAwesomeIcon className="faPlus" icon={faPlus} />
        </div>
        <div>
          Filter by task number:
          <input type="text" onChange={onFilterByNumber} />
        </div>

        <div>
          Filter by task title:
          <input type="text" onChange={onFilterByTitle} />
        </div>
      </div>

      <DnDZone />

      {isShowAddNewTaskModal && <AddNewTaskModal />}
    </>
  );
};

export default TasksPage;
