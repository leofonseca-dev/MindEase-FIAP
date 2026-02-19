import Head from 'next/head';
import Box from '@mui/material/Box';
import Breadcrumb from 'layouts/full/shared/Breadcrumb';
import { TransactionsTable } from '../components/TransactionsTable';

export function TransactionsScreen() {
  const breadcrumbItems = [
    {
      title: 'Transações',
      to: '/home',
    },
  ];

  return (
    <Box display="flex" flexDirection="column" height="80vh">
      <Head>
        <title>Transações</title>
      </Head>

      <Box>
        <Breadcrumb title="Transações" items={breadcrumbItems} />
      </Box>

      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        marginTop={3}
      >
        <TransactionsTable />
      </Box>
    </Box>
  );
}
