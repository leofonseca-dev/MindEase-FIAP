import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
} from '@mui/material';

import { IconMail } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import { AppState, useSelector } from 'store/Store';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const profile = useSelector((s: AppState) => s.user.profile);

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={'/images/profile/user-1.jpg'}
          alt={'ProfileImg'}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            p: 4,
          },
        }}
      >
        <Typography variant="h5">Perfil</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={'/images/profile/user-1.jpg'}
            alt={'ProfileImg'}
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
            >
              {profile.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {profile.role}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <IconMail width={15} height={15} />
              {profile.email}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Box mt={2} display="grid" gap={1}>
          <Button
            component={Link}
            href="/profile"
            variant="contained"
            fullWidth
          >
            Abrir perfil
          </Button>

          <Button
            component={Link}
            href="/profile?tab=prefs"
            variant="outlined"
            fullWidth
          >
            Preferências
          </Button>

          <Divider sx={{ my: 1 }} />

          <Button
            component={Link}
            href="/"
            color="error"
            variant="outlined"
            fullWidth
          >
            Desconectar
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
