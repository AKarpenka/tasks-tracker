/* eslint-disable no-duplicate-case */
import {
  SHOW_ADD_PROJECT_MODAL,
  HIDE_ADD_PROJECT_MODAL,
  SHOW_REMOVE_PROJECT_MODAL,
  HIDE_REMOVE_PROJECT_MODAL
} from '../actions/types';

const initialState = {
  showAddProjectModal: false,
  showRemoveProjectModal: false,
  projectId: null
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ADD_PROJECT_MODAL:
      return {
        ...state,
        showAddProjectModal: true
      };
    case HIDE_ADD_PROJECT_MODAL:
      return {
        ...state,
        showAddProjectModal: false
      };
    case SHOW_REMOVE_PROJECT_MODAL:
      return {
        ...state,
        showRemoveProjectModal: true,
        projectId: action.payload
      };
    case HIDE_REMOVE_PROJECT_MODAL:
      return {
        ...state,
        showRemoveProjectModal: false,
        projectId: null
      };
    default:
      return state;
  }
};

export default modalReducer;
