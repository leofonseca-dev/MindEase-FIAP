import { Box, Grid, Typography } from "@mui/material";
import Image from 'next/image';

export function Footer() {
  return (
    <Box
        sx={{
          height: 200,
          width: '100%',
          backgroundColor: "#000",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={4} justifyContent="center" alignItems="center" maxWidth="lg">
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2" fontWeight="bold" color="white" mb={1}>
              Serviços
            </Typography>
            <Typography variant="subtitle2" color="white" mb={1}>
              Conta corrente
            </Typography>
            <Typography variant="subtitle2" color="white" mb={1}>
              Conta PJ
            </Typography>
            <Typography variant="subtitle2" color="white" mb={1}>
              Cartão de Crédito
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2" fontWeight="bold" color="white" mb={1}>
              Contato
            </Typography>
            <Typography variant="subtitle2" color="white" mb={1}>
              0800 004 250 08
            </Typography>
            <Typography variant="subtitle2" color="white" mb={1}>
              meajuda@bytebank.com.br
            </Typography>
            <Typography variant="subtitle2" color="white" mb={1}>
              ouvidoria@bytebank.com.br
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Image
              src="/images/banner_3.png"
              alt="logo"
              height={100}
              width={250}
              priority
            />
          </Grid>
        </Grid>
      </Box>
  )
}
