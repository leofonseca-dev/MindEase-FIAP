import { Grid } from '@mui/material';

import { useSelector } from 'store/Store';
import {
  LastTransactions,
  YearlyBreakup,
  RevenueUpdates,
  Transactions,
  MonthlyEarnings,
} from '../components';

export function DashboardScreen() {
  const widgets = useSelector((state) => state.widgets);

  return (
    <Grid container spacing={3}>
      {widgets.revenueUpdates && (
        <Grid item xs={12} lg={8}>
          <RevenueUpdates />
        </Grid>
      )}
      {widgets.transactions && (
        <Grid item xs={12} lg={4}>
          <Transactions />
        </Grid>
      )}
      {widgets.monthlyEarnings && (
        <Grid item xs={12} lg={8}>
          <MonthlyEarnings />
        </Grid>
      )}
      {widgets.yearlyBreakup && (
        <Grid item xs={12} lg={4}>
          <YearlyBreakup />
        </Grid>
      )}
      {widgets.lastTransactions && (
        <Grid item xs={24} lg={12}>
          <LastTransactions />
        </Grid>
      )}
    </Grid>
  );
}
