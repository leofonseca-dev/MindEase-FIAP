import { Box, Button, Stack, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useSelector } from 'store/Store';

export function QuickActions() {
  const prefs = useSelector((s) => s.preferences);

  const actions = [
    { title: 'Criar tarefa', desc: 'Quebre em passos pequenos' },
    { title: 'Iniciar foco', desc: 'Comece uma sessão guiada' },
    { title: 'Checklist rápido', desc: 'Reduz sobrecarga' },
    { title: 'Trocar de atividade', desc: 'Transição suave' },
  ];

  const visible = prefs.focusMode ? actions.slice(0, 2) : actions;

  return (
    <DashboardCard title="Ações rápidas" subtitle="Previsível e direto">
      <Stack spacing={1.5} mt={1}>
        {visible.map((a) => (
          <Box
            key={a.title}
            sx={{
              p: 1.25,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="subtitle2">{a.title}</Typography>
            {!prefs.hideSensitiveValues && (
              <Typography variant="body2" color="text.secondary">
                {a.desc}
              </Typography>
            )}
          </Box>
        ))}

        <Button variant="contained">Ir para tarefas</Button>
      </Stack>
    </DashboardCard>
  );
}
