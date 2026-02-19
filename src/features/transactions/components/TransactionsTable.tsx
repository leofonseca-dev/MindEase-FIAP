import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from '@mui/material';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  IconDownload,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import ptBRLocale from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState, useDispatch } from 'store/Store';
import CustomChip from 'components/CustomChip';
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  setEditingTransaction,
} from 'store/transactions/TransactionsSlice';
import { TransactionType } from '../model/TransactionType';
import { TransactionsRegisterForm } from './TransactionsRegisterForm';
import { EditTransactionForm } from './EditTransactionForm';

export function TransactionsTable() {
  const columns = [
    {
      field: 'type',
      headerName: 'Tipo',
      headerClassName: 'header',
      flex: 0.5,
      minWidth: 140,
      type: 'singleSelect',
      valueOptions: ['Entrada', 'Saída', 'Estorno', 'Assinatura'],
      renderCell: (params: any) => (
        <Box>
          {params.value === 'Entrada' ? (
            <CustomChip label="Entrada" type="success" />
          ) : params.value === 'Saída' ? (
            <CustomChip label="Saída" type="error" />
          ) : params.value === 'Estorno' ? (
            <CustomChip label="Estorno" type="warning" />
          ) : params.value === 'Assinatura' ? (
            <CustomChip label="Assinatura" type="primary" />
          ) : null}
        </Box>
      ),
    },
    {
      field: 'time',
      headerName: 'Hora da Transação',
      headerClassName: 'header',
      flex: 1,
    },
    {
      field: 'paymentMethod',
      headerName: 'Tipo de Pagamento',
      headerClassName: 'header',
      flex: 1,
    },
    {
      field: 'value',
      headerName: 'Valor',
      headerClassName: 'header',
      flex: 1,
      valueGetter: (params: any) => {
        return 'R$ ' + params.value;
      },
    },

    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      type: 'actions',
      minWidth: 240,
      headerClassName: 'header',
      renderCell: (params: { row: any }) => (
        <Box gap={1} display="flex" alignItems="center">
          {params.row.attachment instanceof File && (
            <Tooltip title="Baixar anexo">
              <Button
                startIcon={<IconDownload />}
                onClick={() => handleDownloadAttachment(params.row.attachment)}
                sx={
                  customizer.activeMode === 'dark'
                    ? {
                        color: '#EAEFF4',
                        mr: 0.8,
                        '&:hover': {
                          color: '#EAEFF4',
                        },
                        '& .MuiButton-startIcon': {
                          margin: 'auto',
                        },
                      }
                    : {
                        color: '#ffffff',
                        mr: 0.8,
                        '&:hover': {
                          backgroundColor: '#4261b7',
                          color: '#ffffff',
                        },
                        '& .MuiButton-startIcon': {
                          margin: 'auto',
                        },
                      }
                }
              ></Button>
            </Tooltip>
          )}
          <Button
            startIcon={<IconEdit />}
            onClick={() => handleEdit(params.row.id)}
            sx={
              customizer.activeMode === 'dark'
                ? {
                    color: '#EAEFF4',
                    mr: 0.8,
                    '&:hover': {
                      color: '#EAEFF4',
                    },
                    '& .MuiButton-startIcon': {
                      margin: 'auto',
                    },
                  }
                : {
                    color: '#ffffff',
                    mr: 0.8,
                    '&:hover': {
                      backgroundColor: '#4261b7',
                      color: '#ffffff',
                    },
                    '& .MuiButton-startIcon': {
                      margin: 'auto',
                    },
                  }
            }
          />
          <Button
            onClick={() => handleDeleteTransaction(params.row.id)}
            color="error"
          >
            <IconTrash />
          </Button>
        </Box>
      ),
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const customizer = useSelector((state: AppState) => state.customizer);

  const dispatch = useDispatch();
  const rows = useSelector((state: AppState) => state.transactions.list);
  const editingTransaction = useSelector(
    (state: AppState) => state.transactions.editing,
  );

  const handleOpen = () => setOpen(true);

  const handleOpenEdit = async () => {
    try {
      setOpenEdit(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  const handleEdit = (id: string) => {
    const objToEdit = rows.find((transaction) => transaction.id === id);
    if (objToEdit) {
      dispatch(setEditingTransaction(objToEdit));
      handleOpenEdit();
    }
  };

  const handleConfirmEdit = (id: string, data: Partial<TransactionType>) => {
    dispatch(editTransaction({ id, data }));
  };

  const handleDeleteTransaction = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  const handleDownloadAttachment = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredRows = rows
    .filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
    .reverse();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ptBRLocale}
    >
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
                placeholder="PIX"
                sx={{ minWidth: 150 }}
                endAdornment={<IconSearch />}
              />
            </FormControl>
            <Button
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
              Adicionar Novo
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            height={350}
            width="100%"
            paddingX={5}
            sx={{
              '& .header': {
                backgroundColor: 'primary',
              },
            }}
          >
            <DataGrid
              rows={filteredRows}
              columns={columns}
              hideFooterSelectedRowCount
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              autoHeight
              pageSizeOptions={[5, 10, 50, 100]}
              sx={{
                border: 1,
                borderColor: 'divider',
                '& .MuiDataGrid-cell': {
                  border: 1,
                  borderColor: 'divider',
                  ':focus': {
                    outline: 'none',
                  },
                  cursor: 'default',
                },
              }}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
          </Box>
        </Grid>
      </Grid>

      <TransactionsRegisterForm
        open={open}
        handleClose={handleClose}
        onHandleTransaction={(transaction: TransactionType) =>
          dispatch(addTransaction(transaction))
        }
      />
      <EditTransactionForm
        open={openEdit}
        handleClose={handleClose}
        transaction={editingTransaction}
        onHandleEdit={handleConfirmEdit}
      />
    </LocalizationProvider>
  );
}
