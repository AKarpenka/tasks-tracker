import './MainPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Project from '../../components/Project/Project';

const projects = [
  {
    name: 'project 1'
  },
  {
    name: 'project 2'
  },
  {
    name: 'project 3'
  }
];

const MainPage = () => {
  return (
    <div className="main-page-container">
      <h1>All Projects</h1>

      <div className="add-project-btn">
        Add project <FontAwesomeIcon className="faPlus" icon={faPlus} />
      </div>

      {projects.length ? (
        <ul>
          {projects.map((project, i) => {
            return (
              <li key={i}>
                <Project project={project} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No projects</p>
      )}
    </div>
  );
};

export default MainPage;
