import { useParams } from 'react-router-dom';

const TasksPage = () => {
  const { projectName } = useParams();

  return <p>Tasks for the {projectName} will be there</p>;
};

export default TasksPage;
