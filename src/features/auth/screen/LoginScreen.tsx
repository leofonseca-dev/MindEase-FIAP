import { Grid, Box, Card } from '@mui/material';

import PageContainer from 'components/container/PageContainer';
import Logo from 'layouts/full/shared/logo/Logo';
import AuthLogin from '../components/AuthLogin';

export function LoginScreen() {
  return (
    <PageContainer>
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'linear-gradient(to bottom, #004D61 0%, #FFFFFF 100%)',
            position: 'absolute',
            height: '100%',
            width: '100%',
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: '100vh' }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
