import {
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from '@mui/material';
import { IconBellRinging, IconLayoutDashboard } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'store/Store';
import { toggleWidget } from 'store/widgets/WidgetSlice';

const WidgetMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const widgets = useSelector((state) => state.widgets);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const widgetLabels: Record<string, string> = {
    revenueUpdates: 'Informações Gerais',
    transactions: 'Extrato',
    monthlyEarnings: 'Lucro Mensal',
    yearlyBreakup: 'Detalhamento Anual',
    lastTransactions: 'Últimas Transações',
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <IconLayoutDashboard size="21" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Box p={2}>
          <Typography variant="h6" mb={1}>
            Exibir widgets
          </Typography>
          {Object.entries(widgets).map(([key, value]) => (
            <MenuItem key={key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={() => dispatch(toggleWidget(key as keyof typeof widgets))}
                  />
                }
                label={widgetLabels[key] || key}
              />
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default WidgetMenu;
