import Box from '@mui/material/Box';
import { TasksTable } from '../components/TasksTable';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { Alert, Button, Snackbar, Stack, Tab, Tabs } from '@mui/material';
import { TasksKanban } from '../components/TasksKanban';
import { AppState, useDispatch, useSelector } from 'store/Store';
import { useCognitiveAlerts } from '../hooks/useCognitiveAlerts';
import { editTask } from 'store/tasks/TasksSlice';
import { FocusSession } from 'features/home/components';

export function TasksScreen() {
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const customizer = useSelector((state: AppState) => state.customizer);

  const dispatch = useDispatch();
  const tasks = useSelector((s) => s.tasks.list);
  const prefs = useSelector((s) => s.preferences);

  const { alert, dismiss } = useCognitiveAlerts(tasks, prefs);

  const moveToDoing = () => {
    if (!alert?.taskId) return;
    dispatch(editTask({ id: alert.taskId, data: { status: 'DOING' } }));
    dismiss();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={(theme: any) => ({
          width: '100%',
          [theme.breakpoints.up('lg')]: {
            width: `calc(100vw - ${
              customizer.isCollapse
                ? customizer.MiniSidebarWidth
                : customizer.SidebarWidth
            }px)`,
          },
        })}
      >
        <FocusSession dashboard={false} />
        <Tabs
          value={view}
          onChange={(_: any, v: any) => setView(v)}
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Lista" value="list" />
          <Tab label="Kanban" value="kanban" />
        </Tabs>

        <Box flex={1} overflow="auto">
          {view === 'list' ? <TasksTable /> : <TasksKanban />}
        </Box>
      </Box>
      <Snackbar
        open={!!alert}
        onClose={dismiss}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={prefs.focusMode ? 8000 : 12000}
      >
        {alert ? (
          <Alert
            onClose={dismiss}
            severity="info"
            variant="filled"
            sx={{ maxWidth: 560 }}
            action={
              <Stack direction="row" spacing={1}>
                {alert.kind === 'SCHEDULE_NOW' && (
                  <Button color="inherit" size="small" onClick={moveToDoing}>
                    Começar
                  </Button>
                )}
                <Button color="inherit" size="small" onClick={dismiss}>
                  Ok
                </Button>
              </Stack>
            }
          >
            <strong>{alert.title}</strong>
            <div>{alert.message}</div>
          </Alert>
        ) : null}
      </Snackbar>
    </LocalizationProvider>
  );
}
