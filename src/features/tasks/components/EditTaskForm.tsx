import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import GenericModal from 'components/genericModal/baseModal';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { format } from 'date-fns';
import { TaskType, TaskPriority, TaskStatus } from '../model/TaskType';

interface Props {
  open: boolean;
  handleClose: () => void;
  task: TaskType | null;
  onHandleEdit: (id: string, data: Partial<TaskType>) => void;
}

export function EditTaskForm({ open, handleClose, task, onHandleEdit }: Props) {
  const [initialValues, setInitialValues] = useState<any>({
    title: '',
    status: 'TODO' as TaskStatus,
    priority: 'MEDIUM' as TaskPriority,
    estimatedMinutes: 25,
    nextStep: '',
    scheduledTime: '',
    notes: '',
  });

  const schema = yup.object({
    title: yup.string().required('Campo obrigatório'),
    status: yup.string().required('Campo obrigatório'),
    priority: yup.string().required('Campo obrigatório'),
    estimatedMinutes: yup.number().min(5).required('Campo obrigatório'),
    nextStep: yup.string().required('Campo obrigatório'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!task) return;

      const payload: Partial<TaskType> = {
        title: values.title.trim(),
        status: values.status,
        priority: values.priority,
        estimatedMinutes: Number(values.estimatedMinutes),
        nextStep: values.nextStep.trim(),
        notes: values.notes?.trim() || undefined,
        scheduledTime: values.scheduledTime
          ? format(new Date(values.scheduledTime), 'HH:mm')
          : undefined,
      };

      onHandleEdit(task.id, payload);
      handleCloseAndClear();
    },
  });

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
  };

  useEffect(() => {
    if (!task) return;

    let scheduledIso = '';
    if (task.scheduledTime) {
      const [h, m] = task.scheduledTime.split(':').map(Number);
      const d = new Date();
      d.setHours(h, m, 0, 0);
      scheduledIso = d.toISOString();
    }

    setInitialValues({
      title: task.title,
      status: task.status,
      priority: task.priority,
      estimatedMinutes: task.estimatedMinutes,
      nextStep: task.nextStep,
      scheduledTime: scheduledIso,
      notes: task.notes ?? '',
    });
  }, [task]);

  return (
    <GenericModal
      isLoading={false}
      handleClose={handleCloseAndClear}
      formikhandleSubmit={formik.handleSubmit}
      isOpen={open}
      title="Editar tarefa"
    >
      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={12}>
          <TextField
            label="Título *"
            fullWidth
            id="title"
            {...formik.getFieldProps('title')}
            error={formik.touched.title && Boolean(formik.errors.title)}
          />
          <Typography color="error">
            {formik.touched.title && (formik.errors.title as any)}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="status">Etapa *</InputLabel>
            <Select
              label="Etapa *"
              labelId="status"
              id="status"
              {...formik.getFieldProps('status')}
            >
              <MenuItem value="TODO">A fazer</MenuItem>
              <MenuItem value="DOING">Fazendo</MenuItem>
              <MenuItem value="DONE">Feito</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="priority">Prioridade *</InputLabel>
            <Select
              label="Prioridade *"
              labelId="priority"
              id="priority"
              {...formik.getFieldProps('priority')}
            >
              <MenuItem value="LOW">Baixa</MenuItem>
              <MenuItem value="MEDIUM">Média</MenuItem>
              <MenuItem value="HIGH">Alta</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="estimatedMinutes">Tempo *</InputLabel>
            <Select
              label="Tempo *"
              labelId="estimatedMinutes"
              id="estimatedMinutes"
              value={formik.values.estimatedMinutes}
              onChange={(e: any) =>
                formik.setFieldValue('estimatedMinutes', Number(e.target.value))
              }
            >
              {[5, 10, 15, 25, 45, 60].map((m) => (
                <MenuItem key={m} value={m}>
                  {m} min
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TimePicker
              label="Horário (opcional)"
              value={
                formik.values.scheduledTime
                  ? new Date(formik.values.scheduledTime)
                  : null
              }
              onChange={(value: any) =>
                formik.setFieldValue('scheduledTime', value?.toISOString())
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Próximo passo *"
            fullWidth
            id="nextStep"
            {...formik.getFieldProps('nextStep')}
            error={formik.touched.nextStep && Boolean(formik.errors.nextStep)}
          />
          <Typography color="error">
            {formik.touched.nextStep && (formik.errors.nextStep as any)}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Notas (opcional)"
            fullWidth
            multiline
            minRows={3}
            id="notes"
            {...formik.getFieldProps('notes')}
          />
        </Grid>
      </Grid>
    </GenericModal>
  );
}
