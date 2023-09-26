/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import './AddNewTaskContentModal.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../Button/Button';
import { hideAddNewTaskModal } from '../../../redux/actions/modalAction';

const AddNewTask = () => {
  const dispatch = useDispatch();

  const today = new Date();

  const [taskTitle, setTaskTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    console.log(e.target.id);
    console.log(e.target.value);

    switch (e.target.id) {
      case 'taskTitle':
        setTaskTitle(e.target.value);
        break;
      case 'priority':
        setPriority(e);
        break;
      case 'status':
        setStatus(e.target.value);
        break;
    }
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const onCloseModal = () => dispatch(hideAddNewTaskModal());

  return (
    <div className="new-task-content">
      <p className="title">Adding a new task</p>

      <div className="new-task-main-content">
        <label>
          Task title:
          <input id="taskTitle" type="text" value={taskTitle} onChange={handleInputChange} />
        </label>
        {/* <label>
          Time at work:
          <input id="timeAtWork" type="text" value={timeAtWork} onChange={handleInputChange} />
        </label> здесь будет высчитываться дата указанная - текущее число*/}
        <label>
          Deadline:
          <DatePicker
            wrapperClassName="new-task-datePicker"
            dateFormat="yyyy/MM/dd"
            selected={deadline}
            onChange={handleDeadlineChange}
            minDate={today}
            todayButton={'Today'}
          />
        </label>
        <label>
          Priority:
          <select id="priority" defaultValue={'NORMAL'} onChange={handleInputChange}>
            <option value="HIGHEST">Highest</option>
            <option value="HIGH">High</option>
            <option value="NORMAL">Normal</option>
            <option value="LOW">Low</option>
            <option value="LOWEST">Lowest</option>
          </select>
        </label>
        <label>
          Status:
          <select id="status" defaultValue={'ToDo'} onChange={handleInputChange}>
            <option value="ToDo">To-Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>
      </div>

      <div className="new-task-btn">
        <Button value="Create" colorMode="ok" onClickBtn={() => console.log('create')} />
        <Button value="Cancel" colorMode="danger" onClickBtn={onCloseModal} />
      </div>
    </div>
  );
};

export default AddNewTask;
