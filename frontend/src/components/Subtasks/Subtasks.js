/* eslint-disable react/prop-types */
import './Subtask.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusSubtask, deleteSubtask } from '../../redux/actions/subtasksAction';

const Subtasks = () => {
  const dispatch = useDispatch();

  const { subtasks } = useSelector((state) => state.subtasksReducer);

  const handleChange = (e) => {
    const newSubtasks = subtasks.map((subtask) => {
      if (subtask.id === e.target.id) {
        subtask.checked = !subtask.checked;
        return subtask;
      }
      return subtask;
    });
    dispatch(updateStatusSubtask(newSubtasks));
  };

  const handleDelete = (e) => {
    const newSubtasks = subtasks.filter(
      (subtask) => subtask.id !== e.target.parentElement.firstChild.id
    );
    dispatch(deleteSubtask(newSubtasks));
  };

  return (
    <>
      {subtasks.length > 0 && (
        <ul className="subtasks">
          {subtasks.map(({ checked, subtaskTitle, id }) => {
            return (
              <li key={id}>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id={id}
                  checked={checked}
                  onChange={handleChange}
                />
                <label htmlFor={id}>{subtaskTitle}</label>
                <p onClick={handleDelete}>x</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Subtasks;
