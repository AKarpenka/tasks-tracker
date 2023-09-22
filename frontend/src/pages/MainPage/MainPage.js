import './MainPage.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Project from '../../components/Project/Project';
import Spinner from '../../components/Spinner/Spinner';
import useTasksTrackerService from '../../services/TasksTrackerService';
// import withModal from '../../components/Modal/Modal';

const MainPage = () => {
  const { getData, postNewProject } = useTasksTrackerService();
  const projects = useSelector((state) => state.projects);
  const projectsLoadingStatus = useSelector((state) => state.projectsLoadingStatus);
  // const [showModal, setShowModal] = useState(false);

  // const ModalContent = () => {
  //   return <h1>Hello</h1>;
  // };

  // const AddProjectModal = withModal(AddProjectModalContent);

  const onAddProject = (e) => {
    e.preventDefault();
    const data = { projectName: 'Project 4' };
    postNewProject(data);
    // setShowModal(true);
  };

  // const postNewProject = async (e) => {
  //   e.preventDefault();
  //   request('http://localhost:8000/', 'POST', JSON.stringify({ projectName: 'Project 4' }))
  //     .then((data) => {
  //       setProjects(data);
  //     })
  //     .catch((error) => console.error(error));
  // };

  useEffect(() => {
    getData();
  }, []);

  if (projectsLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (projectsLoadingStatus === 'error') {
    return <p>Loading Error</p>;
  }

  const renderProjectsList = (arr) => {
    if (arr.length === 0) {
      return <p>No projects</p>;
    }

    return (
      <ul>
        {arr.map((project) => {
          return (
            <li key={project.id}>
              <Project project={project} />
            </li>
          );
        })}
      </ul>
    );
  };

  const elements = renderProjectsList(projects);

  return (
    <div className="main-page-container">
      <h1>All Projects</h1>

      <div className="add-project-btn" onClick={onAddProject}>
        Add project <FontAwesomeIcon className="faPlus" icon={faPlus} />
      </div>

      {elements}
    </div>
  );
};

export default MainPage;
