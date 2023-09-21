import './MainPage.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Project from '../../components/Project/Project';
import { useHttp } from '../../hooks/http.hook';
// import withModal from '../../components/Modal/Modal';

const MainPage = () => {
  const [projects, setProjects] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const { request } = useHttp();

  // const ModalContent = () => {
  //   return <h1>Hello</h1>;
  // };

  // const AddProjectModal = withModal(AddProjectModalContent);

  const getData = async () => {
    request(`http://localhost:8000/`)
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.error(err));
  };

  const onAddProject = () => {
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
  }, [projects]);

  return (
    <div className="main-page-container">
      <h1>All Projects</h1>

      <div className="add-project-btn" onClick={onAddProject}>
        Add project <FontAwesomeIcon className="faPlus" icon={faPlus} />
      </div>

      {projects.length ? (
        <ul>
          {projects.map((project) => {
            return (
              <li key={project.id}>
                <Project project={project} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No projects</p>
      )}

      {/* <AddProjectModal /> */}
    </div>
  );
};

export default MainPage;
