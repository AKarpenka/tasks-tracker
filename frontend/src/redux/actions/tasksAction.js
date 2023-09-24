import {
  FILTER_TASKS_BY_NUMBER,
  FILTER_TASKS_BY_TITLE,
  TASKS_FETCHING,
  TASKS_FETCHED,
  TASKS_FETCHING_ERROR
} from './types';

export const filterTasksByNumber = (inputValue) => {
  return {
    type: FILTER_TASKS_BY_NUMBER,
    payload: inputValue
  };
};

export const filterTasksByTitle = (inputValue) => {
  return {
    type: FILTER_TASKS_BY_TITLE,
    payload: inputValue
  };
};

export const tasksFetching = () => {
  return {
    type: TASKS_FETCHING
  };
};

export const tasksFetched = (projects) => {
  return {
    type: TASKS_FETCHED,
    payload: projects
  };
};

export const tasksFetchingError = () => {
  return {
    type: TASKS_FETCHING_ERROR
  };
};
