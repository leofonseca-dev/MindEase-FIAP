import { Box, Button, Stack, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'store/Store';

const pad = (n: number) => String(n).padStart(2, '0');

export function FocusSession({ dashboard = true }: { dashboard?: boolean }) {
  const prefs = useSelector((s) => s.preferences);

  const focusMinutes = prefs.focusMode ? 15 : 25;
  const breakMinutes = 5;

  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60);

  const timeLabel = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${pad(m)}:${pad(s)}`;
  }, [secondsLeft]);

  const reset = () => {
    setRunning(false);
    setMode('FOCUS');
    setSecondsLeft(focusMinutes * 60);
  };

  const toggleMode = () => {
    const next = mode === 'FOCUS' ? 'BREAK' : 'FOCUS';
    setMode(next);
    setRunning(false);
    setSecondsLeft((next === 'FOCUS' ? focusMinutes : breakMinutes) * 60);
  };

  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (running) return;
    setSecondsLeft((mode === 'FOCUS' ? focusMinutes : breakMinutes) * 60);
  }, [focusMinutes, breakMinutes, mode]);

  return (
    <DashboardCard
      title={dashboard ? 'Sessão de foco' : undefined}
      subtitle={
        dashboard
          ? prefs.focusMode
            ? 'Modo foco ativo: sessões mais curtas'
            : 'Ritmo guiado com pausas'
          : undefined
      }
    >
      <Stack spacing={2}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack spacing={0.5}>
            <Typography variant="subtitle2" color="text.secondary">
              {mode === 'FOCUS' ? 'Foco' : 'Pausa'}
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              {prefs.hideSensitiveValues ? '••:••' : timeLabel}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Próxima ação:{' '}
              {mode === 'FOCUS'
                ? 'trabalhar em 1 tarefa'
                : 'respirar/alongar e voltar'}
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button variant="contained" onClick={() => setRunning((v) => !v)}>
            {running ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button variant="outlined" onClick={reset}>
            Reiniciar
          </Button>
          <Button variant="outlined" onClick={toggleMode}>
            Trocar para {mode === 'FOCUS' ? 'pausa' : 'foco'}
          </Button>
        </Stack>

        {prefs.summaryMode && (
          <Typography variant="body2" color="text.secondary">
            No modo resumo, mostramos só o essencial para reduzir sobrecarga.
          </Typography>
        )}
      </Stack>
    </DashboardCard>
  );
}
