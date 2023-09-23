import './TasksPage.scss';
import { useParams } from 'react-router-dom';
import DnDZone from '../../components/DnDZone/DnDZone';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { filterTasksByNumber } from '../../redux/actions/tasksAction';

const TasksPage = () => {
  const dispatch = useDispatch();
  const { projectName } = useParams();

  const onFilter = (e) => dispatch(filterTasksByNumber(e.target.value));
  return (
    <>
      <nav>
        <Link to="/">Projects</Link> / {projectName}
      </nav>

      <div className="filters">
        <div>
          Filter by task number:
          <input type="text" onChange={onFilter} />
        </div>

        <div>
          Filter by task title:
          <input type="text" />
        </div>
      </div>

      <DnDZone />
    </>
  );
};

export default TasksPage;
