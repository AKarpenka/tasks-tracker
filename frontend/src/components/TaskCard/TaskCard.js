/* eslint-disable react/prop-types */
import './TaskCard.scss';
import { Draggable } from 'react-beautiful-dnd';
import Priority from '../Priority/Priority';

const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item.task_number} draggableId={item.task_number} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {' '}
          <div className="task-information">
            <div className="first-details">
              <p>{item.task_number}</p>
              <Priority mode={item.priority} />
            </div>
            <p className="title">{item.task_title}</p>

            <div className="secondary-details">
              <p>
                Date of creation:&nbsp;
                <span>
                  {new Date(item.creation_date).toLocaleDateString('en-us', {
                    month: 'short',
                    day: '2-digit'
                  })}
                </span>
              </p>
              <p>
                Deadline:&nbsp;
                <span>
                  {new Date(item.deadline).toLocaleDateString('en-us', {
                    month: 'short',
                    day: '2-digit'
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
