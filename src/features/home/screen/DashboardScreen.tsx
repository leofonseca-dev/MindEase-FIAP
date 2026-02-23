import { Grid } from '@mui/material';
import { useSelector } from 'store/Store';
import { DashboardPreferencesBar } from '../components/DashboardPreferencesBar';

import {
  TodayPlan,
  FocusSession,
  QuickActions,
  WorkloadBreakdown,
  RecentActivity,
} from '../components';

export function DashboardScreen() {
  const widgets = useSelector((state) => state.widgets);
  const prefs = useSelector((state) => state.preferences);

  const allow = (widgetKey: keyof typeof widgets) => {
    if (!widgets[widgetKey]) return false;

    if (prefs.focusMode) {
      return widgetKey === 'todayPlan' || widgetKey === 'focusSession';
    }

    if (prefs.complexityLevel === 1) {
      return widgetKey === 'focusSession' || widgetKey === 'quickActions';
    }
    if (prefs.complexityLevel === 2) {
      return widgetKey !== 'workloadBalance';
    }

    return true;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DashboardPreferencesBar />
      </Grid>

      {allow('todayPlan') && (
        <Grid item xs={12} lg={8}>
          <TodayPlan />
        </Grid>
      )}

      {allow('quickActions') && (
        <Grid item xs={12} lg={4}>
          <QuickActions />
        </Grid>
      )}

      {allow('focusSession') && (
        <Grid item xs={12} lg={prefs.complexityLevel === 2 ? 12 : 8}>
          <FocusSession />
        </Grid>
      )}

      {allow('workloadBalance') && (
        <Grid item xs={12} lg={4}>
          <WorkloadBreakdown />
        </Grid>
      )}

      {allow('recentActivities') && (
        <Grid item xs={12} lg={12}>
          <RecentActivity />
        </Grid>
      )}
    </Grid>
  );
}
