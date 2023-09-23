import './DndZone.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../TaskCard/TaskCard';
import { updateColumns } from '../../redux/actions/tasksAction';
import { useEffect, useState } from 'react';

const DnDZone = () => {
  const dispatch = useDispatch();
  const numberFilter = useSelector((state) => state.tasksReducer.numberFilter);
  const columns = useSelector((state) => state.tasksReducer.columns);
  const [filteredColumns, setFilteredColumns] = useState(columns);

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
      dispatch(
        updateColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems
          }
        })
      );
    } else {
      console.log('в этой же колонке');
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      dispatch(
        updateColumns({
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems
          }
        })
      );
    }
  };

  const filterData = () => {
    console.log('asdd');
    let filteredColumns = {};
    Object.entries(columns).map(([columnId, column]) => {
      filteredColumns = {
        ...filteredColumns,
        [columnId]: {
          ...column,
          items: column.items.filter(
            (item) => item.number === '' || item.number.includes(numberFilter.trim())
          )
        }
      };
    });

    setFilteredColumns(filteredColumns);
  };

  useEffect(() => {
    filterData();
  }, [numberFilter]);

  useEffect(() => {
    filterData();
  }, [columns]);

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns)}>
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
                      <TaskCard key={item.id} item={item} index={index} />
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
