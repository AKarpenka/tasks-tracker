/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import './AddNewTaskContentModal.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../Button/Button';
import PreviewFiles from '../../PreviewFiles/PreviewFiles';
import Subtasks from '../../Subtasks/Subtasks';
import FilesDropZone from '../../FilesDropZone/FilesDropZone';
import { hideAddNewTaskModal } from '../../../redux/actions/modalAction';
import { addSubtask, deleteSubtask } from '../../../redux/actions/subtasksAction';
import { v4 as uuidv4 } from 'uuid';
import useTasksTrackerService from '../../../services/TasksTrackerService';

const AddNewTask = () => {
  const { projectId, projectName } = useParams();
  const { postNewTask } = useTasksTrackerService();
  const dispatch = useDispatch();
  const subtaskRef = useRef();
  const { subtasks } = useSelector((state) => state.subtasksReducer);
  const { numberOfTasks } = useSelector((state) => state.tasksReducer);

  const today = new Date();

  const [taskTitle, setTaskTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('NORMAL');
  const [status, setStatus] = useState('ToDo');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  const [emptyTaskTitle, setEmptyTaskTitle] = useState(false);
  const [emptyDeadline, setEmptyDeadline] = useState(false);

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case 'taskTitle':
        setEmptyTaskTitle(false);
        setTaskTitle(e.target.value);
        break;
      case 'priority':
        setPriority(e.target.value);
        break;
      case 'status':
        setStatus(e.target.value);
        break;
      case 'description':
        setDescription(e.target.getContent());
        break;
    }
  };

  const handleDeadlineChange = (date) => {
    setEmptyDeadline(false);
    setDeadline(date);
  };

  const onAddSubtask = () => {
    const subtaskInputValue = subtaskRef.current.value;
    if (subtaskInputValue) {
      const newSubtask = {
        subtaskTitle: subtaskInputValue,
        checked: false,
        id: uuidv4()
      };
      dispatch(addSubtask(newSubtask));
      subtaskRef.current.value = '';
    }
  };

  const handleFileChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileRemove = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile.id !== fileId));
  };

  const onCloseModal = () => {
    dispatch(hideAddNewTaskModal());
    dispatch(deleteSubtask([]));
  };

  const handleSubmitForm = () => {
    if (!taskTitle) {
      setEmptyTaskTitle(true);
      return;
    }

    if (!deadline) {
      setEmptyDeadline(true);
      return;
    }

    const data = {
      project_name: projectName,
      project_id: projectId,
      task_number: `${projectName}-${numberOfTasks + 1}`,
      task_title: taskTitle,
      creation_date: Date.now(),
      deadline: new Date(deadline).getTime(),
      time_inprogress: 0,
      priority,
      status,
      subtasks: JSON.stringify(subtasks),
      description,
      files: JSON.stringify(files)
    };
    postNewTask(data, projectId, projectName);
    onCloseModal();
  };

  return (
    <div className="new-task-wrapper">
      <p className="title">Adding a new task</p>

      <div className="new-task-content">
        <div className="new-task-main-content">
          <label>
            Task title:
            <input
              id="taskTitle"
              type="text"
              value={taskTitle}
              onChange={handleInputChange}
              required
            />
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
              onKeyDown={(e) => {
                e.preventDefault();
              }}
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

        <div className="new-task-subtasks">
          <label>
            Subtasks:
            <input type="text" ref={subtaskRef} />
            <button onClick={onAddSubtask}>Add</button>
          </label>
          <Subtasks />
        </div>

        <div className="new-task-description">
          <label>
            <span>Description:</span>
            <Editor
              id="description"
              apiKey="zuurtwf0xtns32n7ir2d5qiauz31636syg6ijjiyf96da1pa"
              initialValue=""
              init={{
                plugins: 'link image code',
                toolbar:
                  'undo redo | fontsize | bold italic underline strikethrough | align lineheight | code'
              }}
              onChange={handleInputChange}
            />
          </label>
          {files.length < 5 && (
            <label>
              Add Files:
              <FilesDropZone handleFileChange={handleFileChange} />
            </label>
          )}

          <PreviewFiles files={files} handleFileRemove={handleFileRemove} />
        </div>
      </div>

      <div className="new-task-btn">
        <Button value="Create" colorMode="ok" onClickBtn={handleSubmitForm} />
        <Button value="Cancel" colorMode="danger" onClickBtn={onCloseModal} />
      </div>
      {emptyTaskTitle && (
        <p className="warning">Please fill in the field with the name of the task</p>
      )}
      {emptyDeadline && (
        <p className="warning">Please fill in the field with the date of deadline</p>
      )}
    </div>
  );
};

export default AddNewTask;
