import React from 'react';
import { List, ListItem, IconButton, Checkbox, Typography, Box, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

const TodoList = ({ tasks, setTasks }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const renderTask = (task, index) => (
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <ListItem divider
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? 'lightblue' : '',
            marginBottom: '8px',
            borderRadius: '0px',
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <IconButton {...provided.dragHandleProps} edge="start" aria-label="drag">
            <DragHandleIcon />
          </IconButton>
          <Checkbox />
          <Box flexGrow={1} ml={1}>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" style={{ fontWeight: 500 }}>
                {task.title}
              </Typography>
              {task.priority === 'High' && (
                <Chip label="High Priority" color="error" style={{ marginLeft: 8, fontSize: '0.75rem', height: '24px' }} />
              )}
              <Box flexGrow={1} />
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2 }}>
              {task.description}
            </Typography>
            <Typography variant="caption">
              Due in {task.dueIn} hours
            </Typography>
          </Box>
        </ListItem>
      )}
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => renderTask(task, index))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
