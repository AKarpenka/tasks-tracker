import {
  PROJECTS_FETCHING,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING_ERROR,
  PROJECT_CREATED,
  PROJECT_DELETED
} from '../actions/types';

const initialState = {
  projects: [],
  projectsLoadingStatus: 'idle'
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_FETCHING:
      return {
        ...state,
        projectsLoadingStatus: 'loading'
      };
    case PROJECTS_FETCHED:
      return {
        ...state,
        projects: action.payload,
        projectsLoadingStatus: 'idle'
      };
    case PROJECTS_FETCHING_ERROR:
      return {
        ...state,
        projectsLoadingStatus: 'error'
      };
    case PROJECT_CREATED:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case PROJECT_DELETED:
      return {
        ...state,
        projects: state.projects.filter((item) => item.id !== action.payload)
      };
    default:
      return state;
  }
};

export default projectsReducer;
