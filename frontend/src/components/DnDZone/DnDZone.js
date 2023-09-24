/* eslint-disable react/prop-types */
import './DndZone.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import TaskCard from '../TaskCard/TaskCard';
import { useEffect, useState } from 'react';

const DnDZone = () => {
  const { numberFilter } = useSelector((state) => state.tasksReducer);
  const { titleFilter } = useSelector((state) => state.tasksReducer);
  const reduxColumns = useSelector((state) => state.tasksReducer.columns);
  const [initColumns, setInitColumns] = useState(reduxColumns);
  const [filteredColumns, setFilteredColumns] = useState(reduxColumns);

  const onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      console.log('в другой колонке');
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const newColumns = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      };

      setInitColumns(newColumns);
      filterData(newColumns);
    } else {
      console.log('в этой же колонке');
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      const newColumns = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      };
      setInitColumns(newColumns);
      filterData(newColumns);
    }
  };

  const filterData = (columns) => {
    let filteredColumns = {};
    Object.entries(columns).map(([columnId, column]) => {
      filteredColumns = {
        ...filteredColumns,
        [columnId]: {
          ...column,
          items: column.items.filter(
            (item) =>
              item.task_number === '' ||
              (item.task_number.includes(numberFilter.trim()) &&
                (item.task_title === '' || item.task_title.includes(titleFilter.trim())))
          )
        }
      };
    });

    setFilteredColumns(filteredColumns);
  };

  useEffect(() => {
    filterData(initColumns);
  }, [numberFilter, titleFilter]);

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, initColumns)}>
      <div className="dnd-container">
        <div className="dnd-task-column">
          {Object.entries(filteredColumns).map(([columnId, column]) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div
                    className="dnd-task-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <span className="dnd-task-list-title">{column.title}</span>
                    {column.items.map((item, index) => (
                      <TaskCard key={item.task_number} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default DnDZone;
