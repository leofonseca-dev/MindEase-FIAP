import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useSelector } from 'store/Store';

export function WorkloadBreakdown() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const prefs = useSelector((s) => s.preferences);

  const options: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      animations: { enabled: !prefs.reduceMotion },
      toolbar: { show: false },
      height: 220,
    },
    labels: ['Estudo', 'Trabalho', 'Pausas'],
    colors: [primary, primarylight, '#F9F9FD'],
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: { pie: { donut: { size: '75%' } } },
    tooltip: { theme: theme.palette.mode === 'dark' ? 'dark' : 'light' },
  };

  const series = [45, 35, 20];

  return (
    <DashboardCard
      title="Distribuição da carga"
      subtitle="Equilíbrio ajuda o foco"
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Stack spacing={0.5}>
            <Typography variant="h4" fontWeight={700}>
              Semana atual
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ajuste sua rotina com pausas planejadas.
            </Typography>
          </Stack>
        </Grid>

        {!prefs.summaryMode && (
          <Grid item xs={12} md={6}>
            <Chart
              options={options}
              series={series}
              type="donut"
              height={220}
              width="100%"
            />
          </Grid>
        )}
      </Grid>
    </DashboardCard>
  );
}
