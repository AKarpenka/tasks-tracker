import { UPDATE_COLUMNS, FILTER_TASKS_BY_NUMBER } from '../actions/types';
import { v4 as uuidv4 } from 'uuid';

const data = [
  {
    id: 'task1',
    number: 'project-123',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.',
    // Assigned_To: 'Beltran',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: '25-May-2020'
  },
  {
    id: 'task2',
    number: 'project-124',
    title: 'Fix Styling',
    // Assigned_To: 'Dave',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: '26-May-2020'
  },
  {
    id: 'task3',
    number: 'project-125',
    title: 'Handle Door Specs',
    // Assigned_To: 'Roman',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: '27-May-2020'
  },
  {
    id: 'task4',
    number: 'project-126',
    title: 'morbi',
    // Assigned_To: 'Gawen',
    // Assignee: 'Kai',
    // Status: 'Done',
    // Priority: 'High',
    Due_Date: '23-Aug-2020'
  }
];

const columnsArr = {
  [uuidv4()]: {
    title: 'To-do',
    items: data
  },
  [uuidv4()]: {
    title: 'In Progress',
    items: []
  },
  [uuidv4()]: {
    title: 'Done',
    items: []
  }
};

const initialState = {
  columns: columnsArr,
  numberFilter: ''
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COLUMNS:
      return {
        ...state,
        columns: action.payload
      };
    case FILTER_TASKS_BY_NUMBER:
      return {
        ...state,
        numberFilter: action.payload
      };
    default:
      return state;
  }
};

export default tasksReducer;
