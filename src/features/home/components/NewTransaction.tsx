import React, { useState } from 'react';
import {
  MenuItem,
  Grid,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  TextField,
  Button,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const NewTransaction = () => {
  const [type, setType] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<string>('');

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/\D/g, '');
    inputValue = (Number(inputValue) / 100).toFixed(2);
    setValue(`R$ ${inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);
  };

  return (
    <DashboardCard title="Nova Transação">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        height={200}
      >
        <Grid item xs="auto">
          <FormControl fullWidth>
            <InputLabel id="type">Selecione o tipo de transação</InputLabel>
            <Select
              labelId="type"
              value={type}
              label="Selecione o tipo de transação"
              onChange={handleTypeChange}
              sx={{ minWidth: 250 }}
            >
              <MenuItem value={1}>Câmbio de Moeda</MenuItem>
              <MenuItem value={2}>DOC/TED</MenuItem>
              <MenuItem value={3}>Empréstimo e Financiamento</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs="auto">
          <TextField
            id="value"
            label="Valor"
            variant="outlined"
            value={value}
            onChange={handleValueChange}
            placeholder="R$ 0,00"
            sx={{ minWidth: 150 }}
          />
        </Grid>
        <Grid item xs="auto">
          <Button variant="contained">Concluir Transação</Button>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default NewTransaction;
