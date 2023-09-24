import { useHttp } from '../hooks/http.hook';
import { useDispatch } from 'react-redux';

import {
  projectsFetching,
  projectsFetched,
  projectCreated,
  projectsFetchingError,
  projectDeleted
} from '../redux/actions/projectsAction';

import { tasksFetching, tasksFetched, tasksFetchingError } from '../redux/actions/tasksAction';

const useTasksTrackerService = () => {
  const _apiBase = process.env.REACT_APP_API_BASE_URL;

  const { request } = useHttp();
  const dispatch = useDispatch();

  //get Projects from DB
  const getData = async () => {
    dispatch(projectsFetching());
    request(_apiBase)
      .then((data) => {
        dispatch(projectsFetched(data));
      })
      .catch(() => {
        dispatch(projectsFetchingError());
      });
  };

  //Ports one project
  const postNewProject = async (newProject) => {
    request(_apiBase, 'POST', JSON.stringify(newProject))
      .then((data) => {
        dispatch(projectCreated(data));
      })
      .catch(() => {
        dispatch(projectsFetchingError());
      });
  };

  //Delete one project
  const deleteProject = async (id) => {
    request(`${_apiBase}${id}`, 'DELETE')
      .then(dispatch(projectDeleted(id)))
      .catch(projectsFetchingError());
  };

  //get all tasks
  const getTasks = async (id, projectName) => {
    dispatch(tasksFetching());
    request(`${_apiBase}${id}/${projectName}/tasks/`)
      .then((data) => {
        const columns = {
          ToDo: {
            title: 'To-do',
            items: data.filter((item) => item.status === 'ToDo')
          },
          InProgress: {
            title: 'In Progress',
            items: data.filter((item) => item.status === 'InProgress')
          },
          Done: {
            title: 'Done',
            items: data.filter((item) => item.status === 'Done')
          }
        };
        dispatch(tasksFetched(columns));
      })
      .catch(() => {
        dispatch(tasksFetchingError());
      });
  };

  return {
    getData,
    postNewProject,
    deleteProject,
    getTasks
  };
};

export default useTasksTrackerService;
