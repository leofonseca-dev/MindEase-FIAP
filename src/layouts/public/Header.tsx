import { Box, Grid, Typography, Button } from "@mui/material";
import CreateAccountModal from "components/modal/CreateAccountModal";
import Logo from "layouts/full/shared/logo/Logo";
import { useState } from "react";

export function Header() {

  const [open, setOpen] = useState<boolean>(false)
  return (
    <Box
      sx={{
        height: 64,
        backgroundColor: "#000",
        display: "flex",
        borderRadius: 0,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center" >
        <Grid item xs="auto">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Logo />
          </Box>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h6" color="green">
            Sobre
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h6" color="green">
            Serviços
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems="center" justifyContent="center" height={200}>
        <Grid item xs="auto">
          <Button variant="contained" color="success" onClick={() => setOpen(true)}>Abrir minha conta</Button>
        </Grid>
        <Grid item xs="auto">
          <Button variant="outlined" color="success" href="/auth">Já tenho conta</Button>
        </Grid>

      </Grid>

      <CreateAccountModal open={open} handleClose={() => setOpen(false)}/>
    </Box>
  )
}
