import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@mui/material';
import LastTransactionsData from '../utils/LastTransactionsData';

const lastTransactions = LastTransactionsData;

export function LastTransactions() {
  return (
    <DashboardCard title="Últimas transações" subtitle="Todos os tipos">
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tipo/Hora
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Forma de Pagamento
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Valor
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lastTransactions.map((basic) => (
              <TableRow key={basic.id}>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {basic.type}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      fontSize="12px"
                      variant="subtitle2"
                    >
                      {basic.time}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {basic.paymentMethod}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">R${basic.value}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
}
