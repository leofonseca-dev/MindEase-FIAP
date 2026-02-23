import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Typography,
  Chip,
} from '@mui/material';
import { DataGrid, ptBR, GridColDef } from '@mui/x-data-grid';
import { IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { AppState, useDispatch } from 'store/Store';
import { useSelector } from 'react-redux';
import { TaskType, TaskPriority, TaskStatus } from '../model/TaskType';
import {
  addTask,
  deleteTask,
  editTask,
  setEditingTask,
} from 'store/tasks/TasksSlice';
import { TaskRegisterForm } from './TaskRegisterForm';
import { EditTaskForm } from './EditTaskForm';

const statusLabel: Record<TaskStatus, string> = {
  TODO: 'A fazer',
  DOING: 'Fazendo',
  DONE: 'Feito',
};

const priorityLabel: Record<TaskPriority, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
};

const statusChipColor = (s: TaskStatus): 'default' | 'success' | 'warning' => {
  if (s === 'DONE') return 'success';
  if (s === 'DOING') return 'warning';
  return 'default';
};

const priorityChipColor = (
  p: TaskPriority,
): 'default' | 'warning' | 'error' => {
  if (p === 'HIGH') return 'error';
  if (p === 'MEDIUM') return 'warning';
  return 'default';
};

const checklistProgress = (t: TaskType) => {
  const total = t.checklist.length;
  const done = t.checklist.filter((i) => i.done).length;
  return { total, done };
};

export function TasksTable() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const customizer = useSelector((state: AppState) => state.customizer);
  const prefs = useSelector((state: AppState) => state.preferences);

  const rows = useSelector((state: AppState) => state.tasks.list);
  const editingTask = useSelector((state: AppState) => state.tasks.editing);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  const handleEdit = (id: string) => {
    const obj = rows.find((t) => t.id === id);
    if (obj) {
      dispatch(setEditingTask(obj));
      setOpenEdit(true);
    }
  };

  const handleConfirmEdit = (id: string, data: Partial<TaskType>) => {
    dispatch(editTask({ id, data }));
  };

  const handleDelete = (id: string) => dispatch(deleteTask(id));

  const baseColumns: GridColDef<TaskType>[] = [
    {
      field: 'title',
      headerName: 'Tarefa',
      flex: 1,
      minWidth: 220,
      headerClassName: 'header',
      renderCell: (params) => {
        const { total, done } = checklistProgress(params.row);
        return (
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {params.row.title}
            </Typography>

            {!prefs.hideSensitiveValues && (
              <Typography variant="body2" color="text.secondary">
                Próximo passo: {params.row.nextStep || '—'}
              </Typography>
            )}

            {!prefs.summaryMode && (
              <Typography variant="caption" color="text.secondary">
                Checklist: {done}/{total} • Estimativa:{' '}
                {params.row.estimatedMinutes} min
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Etapa',
      flex: 0.5,
      minWidth: 140,
      headerClassName: 'header',
      renderCell: (params) => (
        <Chip
          size="small"
          label={statusLabel[params.row.status]}
          color={statusChipColor(params.row.status)}
        />
      ),
    },
    {
      field: 'priority',
      headerName: 'Prioridade',
      flex: 0.5,
      minWidth: 140,
      headerClassName: 'header',
      renderCell: (params) => (
        <Chip
          size="small"
          label={priorityLabel[params.row.priority]}
          color={priorityChipColor(params.row.priority)}
        />
      ),
    },
    {
      field: 'scheduledTime',
      headerName: 'Horário',
      flex: 0.4,
      minWidth: 110,
      headerClassName: 'header',
      valueGetter: (params) => params.row.scheduledTime ?? '—',
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.4,
      minWidth: 100,
      headerClassName: 'header',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box gap={1} display="flex" alignItems="center">
          <Button
            startIcon={<IconEdit />}
            onClick={() => handleEdit(params.row.id)}
            sx={
              customizer.activeMode === 'dark'
                ? {
                    color: '#EAEFF4',
                    mr: 0.8,
                    '&:hover': { color: '#EAEFF4' },
                    '& .MuiButton-startIcon': { margin: 'auto' },
                  }
                : {
                    color: '#ffffff',
                    mr: 0.8,
                    '&:hover': { backgroundColor: '#4261b7', color: '#ffffff' },
                    '& .MuiButton-startIcon': { margin: 'auto' },
                  }
            }
          ></Button>

          {!prefs.focusMode && (
            <Button
              onClick={() => handleDelete(params.row.id)}
              color="error"
              aria-label="Excluir tarefa"
            >
              <IconTrash />
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const columns = useMemo(() => {
    if (prefs.focusMode) {
      return baseColumns.filter((c) =>
        ['title', 'status', 'actions'].includes(String(c.field)),
      );
    }
    if (prefs.summaryMode) {
      return baseColumns.filter((c) =>
        ['title', 'status', 'priority', 'actions'].includes(String(c.field)),
      );
    }
    return baseColumns;
  }, [prefs.focusMode, prefs.summaryMode]);

  const filteredRows = useMemo(() => {
    const bySearch = rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );

    return bySearch
      .slice()
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [rows, searchTerm]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingX={5}
        >
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="filter">Pesquisar</InputLabel>
            <OutlinedInput
              id="filter"
              label="Pesquisar"
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              placeholder="ex: Revisar aula"
              sx={{ minWidth: 150 }}
              endAdornment={<IconSearch />}
            />
          </FormControl>

          <Tooltip
            title={
              prefs.focusMode
                ? 'Saia do modo foco para criar novas tarefas'
                : 'Adicionar uma nova tarefa'
            }
          >
            <span>
              <Button
                disabled={prefs.focusMode}
                onClick={handleOpen}
                startIcon={<IconPlus />}
                sx={
                  customizer.activeMode === 'dark'
                    ? {
                        color: '#EAEFF4',
                        '&:hover': { color: '#EAEFF4' },
                        '& .MuiButton-startIcon': { margin: 'auto' },
                      }
                    : {
                        color: '#ffffff',
                        '&:hover': { color: '#ffffff' },
                        '& .MuiButton-startIcon': { margin: 'auto' },
                      }
                }
              >
                Nova tarefa
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box width="100%" paddingX={5}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row: any) => row.id}
            hideFooterSelectedRowCount
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            rowHeight={72}
            pageSizeOptions={[5, 10, 50, 100]}
            sx={{
              border: 1,
              borderColor: 'divider',
              '& .MuiDataGrid-cell': {
                border: 1,
                borderColor: 'divider',
                ':focus': { outline: 'none' },
                cursor: 'default',
              },
            }}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Box>
      </Grid>

      <TaskRegisterForm
        open={open}
        handleClose={handleClose}
        onHandleTask={(task: TaskType) => dispatch(addTask(task))}
      />

      <EditTaskForm
        open={openEdit}
        handleClose={handleClose}
        task={editingTask}
        onHandleEdit={handleConfirmEdit}
      />
    </Grid>
  );
}
