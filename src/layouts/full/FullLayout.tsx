import { styled, Container, Box, useTheme } from '@mui/material';
import { useSelector } from 'store/Store';
import { AppState } from 'store/Store';
import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '99vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  minWidth: 0,
  width: 'auto',
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  marginLeft: 0,
  backgroundColor: 'transparent',
}));

interface Props {
  children: React.ReactNode;
}

const FullLayout: React.FC<Props> = ({ children }) => {
  const customizer = useSelector((state: AppState) => state.customizer);

  const theme = useTheme();

  return (
    <MainWrapper>
      <Sidebar />

      <PageWrapper
        sx={{
          [theme.breakpoints.up('lg')]: {
            ml: `${customizer.isCollapse ? customizer.MiniSidebarWidth : 0}px`,
          },
          minWidth: 0,
        }}
      >
        <Header />
        <Container disableGutters={true} maxWidth={false}>
          <Box sx={{ minHeight: 'calc(100vh - 170px)', mx: 5 }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
