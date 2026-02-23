'use client';

import { Box, Paper, Typography } from '@mui/material';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/Store';
import { editTask } from 'store/tasks/TasksSlice';
import { TaskStatus } from '../model/TaskType';
import {
  clearDoingStarted,
  markDoingStarted,
} from '../utils/taskCognitiveTimers';

const columns: { id: TaskStatus; title: string; color?: string }[] = [
  { id: 'TODO', title: 'A fazer', color: 'primary' },
  { id: 'DOING', title: 'Fazendo', color: 'warning' },
  { id: 'DONE', title: 'Feito', color: 'success' },
];

export function TasksKanban() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: AppState) => state.tasks.list);
  const prefs = useSelector((state: AppState) => state.preferences);

  const filteredColumns = prefs.focusMode
    ? columns.filter((c) => c.id === 'DOING')
    : columns;

  const tasksByStatus = (status: TaskStatus) =>
    tasks
      .filter((t) => t.status === status)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId as TaskStatus;

    const current = tasks.find((t) => t.id === taskId);
    const oldStatus = current?.status;

    if (oldStatus !== 'DOING' && newStatus === 'DOING')
      markDoingStarted(taskId);
    if (oldStatus === 'DOING' && newStatus !== 'DOING')
      clearDoingStarted(taskId);

    dispatch(editTask({ id: taskId, data: { status: newStatus } }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          alignItems: 'stretch',
          mr: 8,
        }}
      >
        {filteredColumns.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided: any) => (
              <Paper
                ref={provided.innerRef}
                {...provided.droppableProps}
                elevation={3}
                sx={{
                  flex: 1,
                  minWidth: 280,
                  p: 2,
                  margin: 4,
                  backgroundColor: 'background.default',
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" mb={2} fontWeight={600}>
                  {column.title}
                </Typography>

                <Box
                  backgroundColor={`${column.color}.main`}
                  height={4}
                  width="full"
                  mb={2}
                  borderRadius={2}
                />
                {tasksByStatus(column.id).map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided: any) => (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        elevation={2}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          cursor: 'grab',
                          transition: '0.2s',
                          '&:hover': {
                            transform: 'scale(1.02)',
                          },
                        }}
                      >
                        <Typography fontWeight={600}>{task.title}</Typography>

                        {!prefs.summaryMode && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={1}
                          >
                            {task.nextStep}
                          </Typography>
                        )}

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          mt={1}
                        >
                          {task.estimatedMinutes} min
                        </Typography>
                      </Paper>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
}
