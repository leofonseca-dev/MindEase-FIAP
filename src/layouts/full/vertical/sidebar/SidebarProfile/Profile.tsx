import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from '../../../../../store/Store';
import { IconPower } from '@tabler/icons-react';
import { AppState } from '../../../../../store/Store';
import Link from 'next/link';

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const profile = useSelector((s: AppState) => s.user.profile);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : '';

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{
        m: 3,
        p: 2,
        borderColor: 'divider',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
      }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={'/images/profile/user-1.jpg'} />

          <Box>
            <Typography variant="h6">{profile.name}</Typography>
            <Typography variant="caption">{profile.role}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                href="/auth"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
