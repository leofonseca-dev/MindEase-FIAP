import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { MenuItem, Grid, Stack, Typography, Box, Chip } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';
import { useSelector } from 'store/Store';

export function TodayPlan() {
  const [day, setDay] = React.useState('1');
  const prefs = useSelector((s) => s.preferences);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDay(event.target.value);
  };

  const options: any = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: { show: !prefs.focusMode },
      height: 260,
      stacked: true,
      animations: { enabled: !prefs.reduceMotion },
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: [6],
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      axisBorder: { show: false },
    },
    yaxis: { min: 0, max: 10, tickAmount: 5 },
    tooltip: { theme: theme.palette.mode === 'dark' ? 'dark' : 'light' },
  };

  const series = [
    { name: 'Foco', data: [6, 7, 5, 8, 4, 3, 6] },
    { name: 'Pausas', data: [2, 1, 3, 1, 4, 5, 2] },
  ];

  const tasks = [
    { title: 'Revisar aula (20min)', tag: 'Curta' },
    { title: 'Entregar atividade (1h)', tag: 'Importante' },
    { title: 'Ler resumo (15min)', tag: 'Leve' },
    { title: 'Organizar agenda', tag: 'Rotina' },
  ];

  const visibleTasks = prefs.focusMode ? tasks.slice(0, 2) : tasks.slice(0, 3);

  return (
    <DashboardCard
      title="Plano de hoje"
      subtitle="Próxima ação clara, sem bagunça"
      action={
        <CustomSelect
          labelId="day-dd"
          id="day-dd"
          size="small"
          value={day}
          onChange={handleChange}
        >
          <MenuItem value={1}>Hoje</MenuItem>
          <MenuItem value={2}>Amanhã</MenuItem>
          <MenuItem value={3}>Esta semana</MenuItem>
        </CustomSelect>
      }
    >
      <Grid container spacing={3}>
        {!prefs.summaryMode && (
          <Grid item xs={12} md={7}>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Ritmo da semana (foco x pausas)
              </Typography>
              <Chart
                options={options}
                series={series}
                type="bar"
                height={260}
                width="100%"
              />
            </Box>
          </Grid>
        )}

        <Grid item xs={12} md={prefs.summaryMode ? 12 : 5}>
          <Stack spacing={1.5}>
            <Typography variant="h6">Próximas tarefas</Typography>

            {visibleTasks.map((t) => (
              <Box
                key={t.title}
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle2">{t.title}</Typography>
                  {!prefs.hideSensitiveValues && (
                    <Chip size="small" label={t.tag} />
                  )}
                </Stack>

                {prefs.summaryMode && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Próximo passo: abrir a tarefa e iniciar foco.
                  </Typography>
                )}
              </Box>
            ))}

            <Typography variant="body2" color="text.secondary">
              Dica: use o **Modo foco** para reduzir estímulos e ir por etapas.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
