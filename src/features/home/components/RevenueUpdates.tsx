import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import {
  MenuItem,
  Grid,
  Stack,
  Typography,
  Avatar,
  Box,
  IconButton,
} from '@mui/material';
import { IconEye } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';

export function RevenueUpdates() {
  const [month, setMonth] = React.useState('1');
  const [text, setText] = React.useState('R$2.500,00');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  const handleHide = () => {
    if (text === 'R$2.500,00') {
      setText('R$ ******');
    } else {
      setText('R$2.500,00');
    }
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const optionscolumnchart: any = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 360,
      stacked: true,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '20%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },

    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: -5,
      max: 5,
      tickAmount: 4,
    },
    xaxis: {
      categories: [
        '16/08',
        '17/08',
        '18/08',
        '19/08',
        '20/08',
        '21/08',
        '22/08',
      ],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: 'Lucros do mês',
      data: [1.5, 2.7, 2.2, 3.6, 1.5, 1.0],
    },
    {
      name: 'Despesas do mês',
      data: [-1.8, -1.1, -2.5, -1.5, -0.6, -1.8],
    },
  ];

  return (
    <DashboardCard
      title="Olá Leonardo!"
      subtitle="Quinta-feira, 08/09/2024"
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>Setembro 2024</MenuItem>
          <MenuItem value={2}>Agosto 2024</MenuItem>
          <MenuItem value={3}>Julho 2024</MenuItem>
        </CustomSelect>
      }
    >
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={12} sm={8}>
          <Box className="rounded-bars">
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="bar"
              height={360}
              width={'100%'}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack spacing={3} mt={3}>
            <Stack direction="column" spacing={2} alignItems="start">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle2" color="textSecondary">
                  Saldo
                </Typography>
                <IconButton size="small" color="primary" onClick={handleHide}>
                  <IconEye size={24} />
                </IconButton>
              </Stack>
              <Box>
                <Typography variant="h3" fontWeight="700">
                  {text}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack spacing={3} my={5}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  mt: 1,
                  height: 9,
                  bgcolor: primary,
                  svg: { display: 'none' },
                }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  Lucros do Mês
                </Typography>
                <Typography variant="h5">R$1.820,00</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  mt: 1,
                  height: 9,
                  bgcolor: secondary,
                  svg: { display: 'none' },
                }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  Despesas do Mês
                </Typography>
                <Typography variant="h5">R$498,00</Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
