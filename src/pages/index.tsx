import { Grid, Box } from '@mui/material';
import PageContainer from 'components/container/PageContainer';
import Image from 'next/image';

const Login2 = () => {
  return (
    <PageContainer>
      <Box
        sx={{
          height: '75vh',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 0
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, #004D61 0%, #FFFFFF 100%)',
            zIndex: 0,
            borderRadius: 0
          }}
        />

        <Grid
          container
          direction={'column'}
          spacing={0}
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '80vh',
            position: 'relative',
            zIndex: 1,
          }}
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
            <Box display="flex" alignItems="center" justifyContent="center">
              <Image
                src="/images/banner_1.png"
                alt="logo"
                height={300}
                width={800}
                priority
              />
            </Box>
          </Grid>
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
            <Box display="flex" alignItems="center" justifyContent="center">
              <Image
                src="/images/banner_2.png"
                alt="logo"
                height={200}
                width={800}
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

Login2.layout = 'Public';
export default Login2;
