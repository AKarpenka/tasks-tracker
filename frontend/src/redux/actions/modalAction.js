import {
  SHOW_ADD_PROJECT_MODAL,
  HIDE_ADD_PROJECT_MODAL,
  SHOW_REMOVE_PROJECT_MODAL,
  HIDE_REMOVE_PROJECT_MODAL,
  SHOW_ADD_NEW_TASK_MODAL,
  HIDE_ADD_NEW_TASK_MODAL
} from './types';

export const showAddProjectModal = () => {
  return {
    type: SHOW_ADD_PROJECT_MODAL
  };
};

export const hideAddProjectModal = () => {
  return {
    type: HIDE_ADD_PROJECT_MODAL
  };
};

export const showRemoveProjectModal = (id) => {
  return {
    type: SHOW_REMOVE_PROJECT_MODAL,
    payload: id
  };
};

export const hideRemoveProjectModal = () => {
  return {
    type: HIDE_REMOVE_PROJECT_MODAL
  };
};

export const showAddNewTaskModal = () => {
  return {
    type: SHOW_ADD_NEW_TASK_MODAL
  };
};

export const hideAddNewTaskModal = () => {
  return {
    type: HIDE_ADD_NEW_TASK_MODAL
  };
};
