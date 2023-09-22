import './MainPage.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Project from '../../components/Project/Project';
import Spinner from '../../components/Spinner/Spinner';
import useTasksTrackerService from '../../services/TasksTrackerService';
import withModal from '../../components/Modal/ModalHOC/Modal';
import AddProjectContentModal from '../../components/Modal/AddProjectContentModal/AddProjectContentModal';
import { showAddProjectModal } from '../../redux/actions/modalAction';

const MainPage = () => {
  const dispatch = useDispatch();
  const { getData } = useTasksTrackerService();
  const { projects } = useSelector((state) => state.projectsReducer);
  const { projectsLoadingStatus } = useSelector((state) => state.projectsReducer);
  const isShowAddProjectModal = useSelector((state) => state.modalReducer.showAddProjectModal);

  const AddProjectModal = withModal(AddProjectContentModal);

  const onAddProject = () => dispatch(showAddProjectModal());

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

      {isShowAddProjectModal && <AddProjectModal />}
    </div>
  );
};

export default MainPage;
