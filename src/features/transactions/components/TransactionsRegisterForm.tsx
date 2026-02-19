import {
  Button,
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
import { format, setHours, setMinutes } from 'date-fns';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { TransactionType } from '../model/TransactionType';

interface ITransactionsRegisterProps {
  open: boolean;
  handleClose: () => void;
  onHandleTransaction: (transaction: TransactionType) => void;
}

interface IFormValues {
  id: string;
  type: string;
  time: string;
  value: string;
  paymentMethod: string;
  attachment: File | null;
}

export function TransactionsRegisterForm({
  open,
  handleClose,
  onHandleTransaction,
}: ITransactionsRegisterProps) {
  const schemaTransactionss = yup.object({
    type: yup.string().required('Campo Obrigatório'),
    time: yup.string().required('Campo Obrigatório'),
    value: yup.string().required('Campo Obrigatório'),
    paymentMethod: yup.string().required('Campo Obrigatório'),
    attachment: yup.mixed().nullable(),
  });

  const initialValues: IFormValues = {
    id: '',
    type: '',
    time: setHours(setMinutes(new Date(), 0), 12).toISOString(),
    value: '',
    paymentMethod: '',
    attachment: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaTransactionss,
    onSubmit: (values) => {
      try {
        values.id = crypto.randomUUID();
        values.time = format(new Date(values.time), 'HH:mm');
        values.value = values.value.replace(/[^\d,]/g, '').replace(',', '.');
        onHandleTransaction(values);

        toast.success('Transação criada com sucesso');
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
      title="Dados da Transação"
      isLoading={false}
    >
      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="type" htmlFor="type">
              Tipo *
            </InputLabel>
            <Select
              label="Tipo *"
              labelId="type"
              id="type"
              {...formik.getFieldProps('type')}
              error={formik.touched.type && Boolean(formik.errors.type)}
            >
              <MenuItem value={'Entrada'}>Entrada</MenuItem>
              <MenuItem value={'Saída'}>Saída</MenuItem>
              <MenuItem value={'Estorno'}>Estorno</MenuItem>
              <MenuItem value={'Assinatura'}>Assinatura</MenuItem>
            </Select>
            <Typography color="error">
              {formik.touched.type && formik.errors.type}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Valor *"
              fullWidth
              id="value"
              name="value"
              value={formik.values.value}
              onChange={(e: any) => {
                const rawValue = e.target.value.replace(/\D/g, '');
                const numeric = Number(rawValue) / 100;
                const formatted = numeric.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                });
                formik.setFieldValue('value', formatted);
              }}
              error={formik.touched.value && Boolean(formik.errors.value)}
            />

            <Typography color="error">
              {formik.touched.value && formik.errors.value}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TimePicker
              label="Hora *"
              value={formik.values.time ? new Date(formik.values.time) : null}
              onChange={(value: any) => {
                formik.setFieldValue('time', value?.toISOString());
              }}
            />
            <Typography color="error">
              {formik.touched.time && formik.errors.time}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="paymentMethod" htmlFor="paymentMethod">
              Forma de Pagamento *
            </InputLabel>
            <Select
              label="Forma de Pagamento *"
              labelId="paymentMethod"
              id="paymentMethod"
              {...formik.getFieldProps('paymentMethod')}
              error={
                formik.touched.paymentMethod &&
                Boolean(formik.errors.paymentMethod)
              }
            >
              <MenuItem value={'Pix'}>PIX</MenuItem>
              <MenuItem value={'Cartão de Crédito'}>Cartão de Crédito</MenuItem>
              <MenuItem value={'Boleto'}>Boleto</MenuItem>
              <MenuItem value={'Outro'}>Outro</MenuItem>
            </Select>
            <Typography color="error">
              {formik.touched.paymentMethod && formik.errors.paymentMethod}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <Typography variant="subtitle2" mb={1}>
              Anexo (Recibo ou Comprovante)
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={9}>
                <TextField
                  disabled
                  fullWidth
                  value={formik.values.attachment?.name || ''}
                  placeholder="Nenhum arquivo selecionado"
                />
              </Grid>
              <Grid item xs={3} mt={0.5}>
                <Button variant="contained" component="label" fullWidth>
                  Selecionar
                  <input
                    type="file"
                    hidden
                    onChange={(event: any) => {
                      formik.setFieldValue(
                        'attachment',
                        event.currentTarget.files?.[0] ?? null,
                      );
                    }}
                  />
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </GenericModal>
  );
}
