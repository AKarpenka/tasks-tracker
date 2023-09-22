import { useHttp } from '../hooks/http.hook';
import { useDispatch } from 'react-redux';

import {
  projectsFetching,
  projectsFetched,
  projectCreated,
  projectsFetchingError,
  projectDeleted
} from '../redux/actions/projectsAction';

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
  const postNewProject = async () => {
    dispatch(projectsFetching());
    request(_apiBase, 'POST', JSON.stringify({ projectName: 'Project 4' }))
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
      .catch((error) => console.error(error));
  };

  return {
    getData,
    postNewProject,
    deleteProject
  };
};

export default useTasksTrackerService;
