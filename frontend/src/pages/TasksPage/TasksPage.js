import './TasksPage.scss';
import DnDZone from '../../components/DnDZone/DnDZone';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterTasksByNumber, filterTasksByTitle } from '../../redux/actions/tasksAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useTasksTrackerService from '../../services/TasksTrackerService';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner/Spinner';

const TasksPage = () => {
  const { getTasks } = useTasksTrackerService();
  const { tasksLoadingStatus } = useSelector((state) => state.tasksReducer);
  const dispatch = useDispatch();
  const { projectId, projectName } = useParams();

  const onFilterByNumber = (e) => dispatch(filterTasksByNumber(e.target.value));
  const onFilterByTitle = (e) => dispatch(filterTasksByTitle(e.target.value));

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
        <div className="add-task-btn" onClick={() => console.log('add task')}>
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
    </>
  );
};

export default TasksPage;
