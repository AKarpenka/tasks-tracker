import {
  PROJECTS_FETCHING,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING_ERROR,
  PROJECT_CREATED,
  PROJECT_DELETED
} from './types';

export const projectsFetching = () => {
  return {
    type: PROJECTS_FETCHING
  };
};

export const projectsFetched = (projects) => {
  return {
    type: PROJECTS_FETCHED,
    payload: projects
  };
};

export const projectsFetchingError = () => {
  return {
    type: PROJECTS_FETCHING_ERROR
  };
};

export const projectCreated = (project) => {
  return {
    type: PROJECT_CREATED,
    payload: project
  };
};

export const projectDeleted = (id) => {
  return {
    type: PROJECT_DELETED,
    payload: id
  };
};
