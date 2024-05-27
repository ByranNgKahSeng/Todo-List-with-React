// src/components/pages/TodoList.jsx
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Box,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
  ...(isDragging && {
    background: "#E7F1F7"
  }),
});

const calculateDueTime = (startTime, duration) => {
  if (!duration || duration.value === 0) {
    return {
      message: " "
    };
  }

  const start = new Date(startTime);
  let dueTime = new Date(start);

  if (duration.unit === 'Minutes') {
    dueTime.setMinutes(start.getMinutes() + duration.value);
  } else if (duration.unit === 'Hours') {
    dueTime.setHours(start.getHours() + duration.value);
  }

  return {
    startTime: start,
    dueTime: dueTime,
    isOverdue: new Date() > dueTime,
    hasStarted: new Date() >= start,
  };
};

const formatTimeDifference = (startTime, endTime) => {
  const diffMs = endTime - startTime;
  const absDiffMs = Math.abs(diffMs);
  const diffHrs = Math.floor(absDiffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffMs > 0) {
    return ` ${diffHrs} hours ${diffMins} minutes`;
  } else {
    return `Overdue by ${diffHrs} hours ${diffMins} minutes`;
  }
};

const TodoList = ({ tasks, status, onEdit, onDelete, onStatusChange }) => {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            backgroundColor: snapshot.isDraggingOver ? '' : '',
            padding: 2,
            borderRadius: 2,
            minHeight: 100,
          }}
        >
          <List>
            {tasks.map((task, index) => {
              const { startTime, dueTime, isOverdue, hasStarted, message } = calculateDueTime(task.start_time, task.duration);

              let dueMessage;
              if (message) {
                dueMessage = message;
              } else if (isOverdue) {
                dueMessage = formatTimeDifference(new Date(), dueTime);
              } else if (!hasStarted) {
                dueMessage = `Starting in ${formatTimeDifference(new Date(), startTime)}`;
              } else {
                dueMessage = `Due in ${formatTimeDifference(new Date(), dueTime)}`;
              }

              return (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <ListItem divider
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      secondaryAction={
                        <Box>
                          <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <Box {...provided.dragHandleProps} sx={{ marginRight: 1 }}>
                        <DragHandleIcon />
                      </Box>
                      <Checkbox
                        checked={status === 'Completed'}
                        onChange={() => onStatusChange(task)}
                      />
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                              variant="body1"
                              sx={{
                                textDecoration: status === 'Completed' ? 'line-through' : 'none'
                              }}
                            >
                              {task.title}
                            </Typography>
                            {task.priority === 'High' && (
                              <Chip label="High Priority" color="secondary" style={{ marginLeft: 8, fontSize: '0.75rem', height: '24px' }} />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" noWrap>
                              {task.description}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {dueMessage}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </List>
        </Box>
      )}
    </Droppable>
  );
};

export default TodoList;
