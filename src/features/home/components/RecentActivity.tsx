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
  Chip,
} from '@mui/material';
import { useSelector } from 'store/Store';

const data = [
  {
    id: 1,
    type: 'Tarefa concluída',
    time: '10:20',
    detail: 'Revisar aula',
    tag: 'Feito',
  },
  {
    id: 2,
    type: 'Sessão de foco',
    time: '09:40',
    detail: '25 min',
    tag: 'Foco',
  },
  { id: 3, type: 'Pausa', time: '09:10', detail: '5 min', tag: 'Pausa' },
];

export function RecentActivity() {
  const prefs = useSelector((s) => s.preferences);
  const visible = prefs.focusMode ? data.slice(0, 2) : data;

  return (
    <DashboardCard
      title="Atividade recente"
      subtitle="Para manter previsibilidade"
    >
      <TableContainer>
        <Table aria-label="recent activity" sx={{ whiteSpace: 'nowrap' }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Evento
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hora
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Detalhe
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visible.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {row.type}
                    </Typography>
                    {!prefs.hideSensitiveValues && (
                      <Chip size="small" label={row.tag} sx={{ mt: 0.5 }} />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {row.time}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {prefs.hideSensitiveValues ? '•••' : row.detail}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
}
