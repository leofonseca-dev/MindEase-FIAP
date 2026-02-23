import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import GenericModal from 'components/genericModal/baseModal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { format, setHours, setMinutes } from 'date-fns';
import { TaskPriority, TaskStatus, TaskType } from '../model/TaskType';

interface Props {
  open: boolean;
  handleClose: () => void;
  onHandleTask: (task: TaskType) => void;
}

type FormValues = {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedMinutes: number;
  nextStep: string;
  scheduledTime: string;
  notes: string;
};

export function TaskRegisterForm({ open, handleClose, onHandleTask }: Props) {
  const schema = yup.object({
    title: yup.string().required('Campo obrigatório'),
    status: yup.string().required('Campo obrigatório'),
    priority: yup.string().required('Campo obrigatório'),
    estimatedMinutes: yup.number().min(5).required('Campo obrigatório'),
    nextStep: yup.string().required('Campo obrigatório'),
    scheduledTime: yup.string().nullable(),
    notes: yup.string().nullable(),
  });

  const initialValues: FormValues = {
    title: '',
    status: 'TODO',
    priority: 'MEDIUM',
    estimatedMinutes: 25,
    nextStep: '',
    scheduledTime: setHours(setMinutes(new Date(), 0), 12).toISOString(),
    notes: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      try {
        const task: TaskType = {
          id: crypto.randomUUID(),
          title: values.title.trim(),
          status: values.status,
          priority: values.priority,
          estimatedMinutes: values.estimatedMinutes,
          nextStep: values.nextStep.trim(),
          scheduledTime: values.scheduledTime
            ? format(new Date(values.scheduledTime), 'HH:mm')
            : undefined,
          notes: values.notes?.trim() || undefined,
          checklist: [
            { id: crypto.randomUUID(), label: 'Começar', done: false },
            { id: crypto.randomUUID(), label: 'Continuar', done: false },
            { id: crypto.randomUUID(), label: 'Finalizar', done: false },
          ],
          attachment: null,
          createdAt: new Date().toISOString(),
        };

        onHandleTask(task);
      } catch (error) {
        console.log(error);
      } finally {
        handleCloseAndClear();
      }
    },
  });

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <GenericModal
      handleClose={handleCloseAndClear}
      isOpen={open}
      formikhandleSubmit={formik.handleSubmit}
      title="Nova tarefa"
      isLoading={false}
    >
      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={12}>
          <TextField
            label="Título *"
            fullWidth
            id="title"
            {...formik.getFieldProps('title')}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            placeholder="Ex: Revisar aula (20 min)"
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="status">Etapa *</InputLabel>
            <Select
              label="Etapa *"
              labelId="status"
              id="status"
              {...formik.getFieldProps('status')}
              error={formik.touched.status && Boolean(formik.errors.status)}
            >
              <MenuItem value="TODO">A fazer</MenuItem>
              <MenuItem value="DOING">Fazendo</MenuItem>
              <MenuItem value="DONE">Feito</MenuItem>
            </Select>
            <Typography color="error">
              {formik.touched.status && (formik.errors.status as any)}
            </Typography>
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
              error={formik.touched.priority && Boolean(formik.errors.priority)}
            >
              <MenuItem value="LOW">Baixa</MenuItem>
              <MenuItem value="MEDIUM">Média</MenuItem>
              <MenuItem value="HIGH">Alta</MenuItem>
            </Select>
            <Typography color="error">
              {formik.touched.priority && (formik.errors.priority as any)}
            </Typography>
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
            <Typography variant="caption" color="text.secondary">
              Dica: escolha pouco tempo para começar (menos sobrecarga).
            </Typography>
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
              onChange={(value: any) => {
                formik.setFieldValue('scheduledTime', value?.toISOString());
              }}
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
            helperText={formik.touched.nextStep && formik.errors.nextStep}
            placeholder="Ex: abrir o PDF e ler 1 página"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Notas (opcional)"
            fullWidth
            multiline
            minRows={3}
            id="notes"
            {...formik.getFieldProps('notes')}
            placeholder="Escreva só o necessário."
          />
        </Grid>
      </Grid>
    </GenericModal>
  );
}
