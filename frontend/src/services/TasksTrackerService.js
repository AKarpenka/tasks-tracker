import { useHttp } from '../hooks/http.hook';
import { useDispatch } from 'react-redux';

import {
  projectsFetching,
  projectsFetched,
  projectCreated,
  projectsFetchingError,
  projectDeleted
} from '../redux/actions/projectsAction';

import {
  tasksFetching,
  tasksFetched,
  tasksFetchingError,
  updateNumberOfTasks
} from '../redux/actions/tasksAction';

const useTasksTrackerService = () => {
  const _apiBase = process.env.REACT_APP_API_BASE_URL;

  const { request } = useHttp();
  const dispatch = useDispatch();

  const dataFormatting = (data) => {
    return {
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
  };

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
        const columns = dataFormatting(data);
        dispatch(tasksFetched(columns));

        const numberOfTasks = data.length;
        dispatch(updateNumberOfTasks(numberOfTasks));
      })
      .catch(() => {
        dispatch(tasksFetchingError());
      });
  };

  //Update task status
  const updateTaskStatus = async (taskNumber, newStatus) => {
    request(
      `${_apiBase}tasks/${taskNumber}`,
      'PUT',
      JSON.stringify({ newStatus: newStatus })
    ).catch(() => {
      dispatch(tasksFetchingError());
    });
  };

  //post new task
  const postNewTask = async (data, id, projectName) => {
    dispatch(tasksFetching());
    request(`${_apiBase}newTask/`, 'POST', JSON.stringify(data))
      .then((data) => {
        if (data == '200') {
          getTasks(id, projectName);
        } else {
          dispatch(tasksFetchingError());
        }
      })
      .catch(() => {
        dispatch(tasksFetchingError());
      });
  };

  return {
    getData,
    postNewProject,
    deleteProject,
    getTasks,
    updateTaskStatus,
    postNewTask
  };
};

export default useTasksTrackerService;
