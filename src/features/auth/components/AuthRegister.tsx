import { Box, Typography, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import Link from "next/link";
import { Stack } from "@mui/system";
import { registerType } from "types";
import CustomFormLabel from "components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "components/forms/theme-elements/CustomTextField";
import * as yup from 'yup';
import { useRouter } from "next/router";
import { useFormik } from "formik";

interface IFormValues {
  username: string;
  email: string;
  password: string;
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {

  const schemaLogin = yup.object({
    username: yup.string().required('Usuário Obrigatório'),
    email: yup.string().email('Email precisa ser de um formato válido').required('Email Obrigatório'),
    password: yup.string().required('Senha Obrigatória'),
  });

  const router = useRouter();

  const initialValues: IFormValues = {
    username: '',
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaLogin,
    onSubmit: async () => {
      try {
        router.push('/home')
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Box>
            <CustomFormLabel htmlFor="username">Usuário</CustomFormLabel>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('username')}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
        </Stack>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco." />
        </FormGroup>
        <Box display={'flex'} justifyContent={'center'} marginTop={4}>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            type="submit"
          >
            Criar conta
          </Button>
        </Box>
      </Box>
      {subtitle}
    </form>
  )
};

export default AuthRegister;
